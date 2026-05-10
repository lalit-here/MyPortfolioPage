import { Ratelimit, type Duration } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/cloudflare";
import { NextResponse, type NextRequest } from "next/server";

export function json429(retryAfterSeconds: number, message: string) {
  return NextResponse.json(
    { error: message },
    {
      status: 429,
      headers: {
        "Retry-After": String(Math.max(1, retryAfterSeconds)),
      },
    },
  );
}

export function attachRateLimitHeaders(
  response: NextResponse,
  result: { limit: number; remaining: number; resetAt: number },
) {
  response.headers.set("X-RateLimit-Limit", String(result.limit));
  response.headers.set("X-RateLimit-Remaining", String(result.remaining));
  response.headers.set("X-RateLimit-Reset", String(Math.ceil(result.resetAt / 1000)));
}

type WindowEntry = {
  count: number;
  resetAt: number;
};

const memoryStore = new Map<string, WindowEntry>();

function maybePrune(now: number) {
  if (Math.random() > 0.02) return;
  for (const [key, entry] of memoryStore) {
    if (now > entry.resetAt + 60_000) memoryStore.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

/**
 * Fixed-window counter (fallback when Upstash env is not set). Per Edge isolate only.
 */
export function consumeRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  maybePrune(now);

  let entry = memoryStore.get(key);
  if (!entry || now >= entry.resetAt) {
    entry = { count: 0, resetAt: now + windowMs };
    memoryStore.set(key, entry);
  }

  if (entry.count >= limit) {
    return {
      ok: false,
      limit,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  entry.count += 1;
  return {
    ok: true,
    limit,
    remaining: limit - entry.count,
    resetAt: entry.resetAt,
  };
}

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "127.0.0.1";
}

/**
 * Login-related API paths: stricter limit (default 5 / 10 minutes).
 * Matches `/api/login`, `/api/.../login`, and NextAuth-style `/api/auth/signin`.
 */
export function isLoginRoute(pathname: string): boolean {
  const path = pathname.toLowerCase();
  if (!path.startsWith("/api/")) return false;
  if (path === "/api/login") return true;
  if (path === "/api/auth/signin" || path.startsWith("/api/auth/signin/")) return true;

  const segments = path.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  return last === "login";
}

export function getLoginRateLimitConfig() {
  const max = Math.max(1, Number(process.env.RATE_LIMIT_LOGIN_MAX) || 5);
  const windowMs = Math.max(
    60_000,
    Number(process.env.RATE_LIMIT_LOGIN_WINDOW_MS) || 10 * 60 * 1000,
  );
  return { max, windowMs };
}

export function getApiRateLimitConfig() {
  const max = Math.max(1, Number(process.env.RATE_LIMIT_API_MAX) || 100);
  const windowMs = Math.max(
    60_000,
    Number(process.env.RATE_LIMIT_API_WINDOW_MS) || 10 * 60 * 1000,
  );
  return { max, windowMs };
}

export function rateLimitBucketKey(kind: "login" | "api", ip: string): string {
  if (kind === "login") {
    return `login:${ip}`;
  }
  return `api:${ip}`;
}

/** Upstash Redis REST credentials from the Upstash console (same DB can power Ratelimit). */
export function isUpstashRedisConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() &&
      process.env.UPSTASH_REDIS_REST_TOKEN?.trim(),
  );
}

/** Maps configured window length to a string Upstash accepts, e.g. `"10 m"`, `"90 s"`. */
function windowMsToUpstashWindow(windowMs: number): Duration {
  const ms = Math.max(1000, windowMs);
  if (ms % 86_400_000 === 0) {
    const d = ms / 86_400_000;
    return `${d} d` as Duration;
  }
  if (ms % 3_600_000 === 0) {
    const h = ms / 3_600_000;
    return `${h} h` as Duration;
  }
  if (ms % 60_000 === 0) {
    const m = ms / 60_000;
    return `${m} m` as Duration;
  }
  const s = Math.max(1, Math.round(ms / 1000));
  return `${s} s` as Duration;
}

let upstashRatelimits: { login: Ratelimit; api: Ratelimit } | null = null;

function getUpstashRatelimits(): { login: Ratelimit; api: Ratelimit } {
  if (upstashRatelimits) return upstashRatelimits;

  const redis = Redis.fromEnv();
  const loginCfg = getLoginRateLimitConfig();
  const apiCfg = getApiRateLimitConfig();
  const loginWindow = windowMsToUpstashWindow(loginCfg.windowMs);
  const apiWindow = windowMsToUpstashWindow(apiCfg.windowMs);

  upstashRatelimits = {
    login: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(loginCfg.max, loginWindow),
      prefix: "portfolio:ratelimit:login",
      analytics: false,
    }),
    api: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(apiCfg.max, apiWindow),
      prefix: "portfolio:ratelimit:api",
      analytics: false,
    }),
  };

  return upstashRatelimits;
}

/**
 * Distributed limit when `UPSTASH_REDIS_REST_*` is set; otherwise in-memory (local dev).
 */
export async function checkRateLimit(
  ip: string,
  kind: "login" | "api",
): Promise<RateLimitResult> {
  const key = rateLimitBucketKey(kind, ip);

  if (isUpstashRedisConfigured()) {
    const { login, api } = getUpstashRatelimits();
    const rl = kind === "login" ? login : api;
    const { success, limit, remaining, reset } = await rl.limit(key);
    return {
      ok: success,
      limit,
      remaining,
      resetAt: reset,
    };
  }

  const cfg = kind === "login" ? getLoginRateLimitConfig() : getApiRateLimitConfig();
  return consumeRateLimit(key, cfg.max, cfg.windowMs);
}
