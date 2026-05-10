import { NextResponse } from "next/server";

/** Upper bounds — reject before heavier work (Redis, handlers). */
export const LIMITS = {
  /** Total serialized URL length */
  maxUrlChars: 8_192,
  maxPathnameChars: 2_048,
  maxQueryChars: 4_096,
  /** Single header values used as identifiers */
  maxForwardedIpChars: 128,
  /** Generic JSON body cap for API routes */
  maxJsonBodyBytes: 16_384,
} as const;

const CTRL_OR_WS = /[\u0000-\u001f\u007f]/;

export function jsonError(status: number, message: string) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Rejects control characters, NUL URL-encoding, and oversized URL/path/query on API requests.
 */
export function validateApiRequestUrl(url: URL): { ok: true } | { ok: false; response: NextResponse } {
  const serialized = url.href;
  if (serialized.length > LIMITS.maxUrlChars) {
    return { ok: false, response: jsonError(414, "URI too long") };
  }

  const { pathname, search } = url;
  if (pathname.length > LIMITS.maxPathnameChars) {
    return { ok: false, response: jsonError(414, "Path too long") };
  }
  if (search.length > LIMITS.maxQueryChars) {
    return { ok: false, response: jsonError(414, "Query too long") };
  }

  if (CTRL_OR_WS.test(pathname) || CTRL_OR_WS.test(search)) {
    return { ok: false, response: jsonError(400, "Malformed request") };
  }

  const lowerPath = pathname.toLowerCase();
  if (lowerPath.includes("%00") || lowerPath.includes("\0")) {
    return { ok: false, response: jsonError(400, "Malformed path") };
  }
  if (search.includes("%00") || search.includes("\0")) {
    return { ok: false, response: jsonError(400, "Malformed query") };
  }

  return { ok: true };
}

/**
 * First hop from X-Forwarded-For / X-Real-Ip — strict charset & length so rate-limit keys stay safe.
 */
export function sanitizeClientIp(raw: string | null): string {
  if (!raw) return "127.0.0.1";

  let candidate = raw.trim().slice(0, LIMITS.maxForwardedIpChars);
  if (!candidate) return "127.0.0.1";

  if (candidate.startsWith("[") && candidate.includes("]")) {
    candidate = candidate.slice(1, candidate.indexOf("]")).trim();
  }
  // Strip accidental zone id (fe80::1%eth0) — not useful for remote limiting
  const pct = candidate.indexOf("%");
  if (pct !== -1) candidate = candidate.slice(0, pct);

  if (
    candidate.length === 0 ||
    candidate.length > 45 ||
    CTRL_OR_WS.test(candidate) ||
    /[,;]/.test(candidate)
  ) {
    return "127.0.0.1";
  }

  // IPv4 dotted quad or IPv6 hex/colons only (no hostnames — avoids DNS-ish junk in keys)
  if (!/^[\d.a-fA-F:]+$/i.test(candidate)) {
    return "127.0.0.1";
  }

  return candidate;
}

type BoundedJsonOk<T> = { ok: true; value: T };
type BoundedJsonErr = { ok: false; response: NextResponse };

/**
 * Read and parse JSON with a hard byte ceiling (streaming-safe).
 */
export async function readBoundedJson<T = unknown>(
  request: Request,
  maxBytes: number = LIMITS.maxJsonBodyBytes,
): Promise<BoundedJsonOk<T> | BoundedJsonErr> {
  const len = request.headers.get("content-length");
  if (len !== null) {
    const n = Number(len);
    if (!Number.isFinite(n) || n < 0 || n > maxBytes) {
      return { ok: false, response: jsonError(413, "Payload too large") };
    }
  }

  const reader = request.body?.getReader();
  if (!reader) {
    return { ok: false, response: jsonError(400, "Missing body") };
  }

  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel().catch(() => {});
        return { ok: false, response: jsonError(413, "Payload too large") };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, response: jsonError(400, "Invalid body") };
  }

  let decoded: string;
  try {
    decoded = new TextDecoder("utf-8", { fatal: true }).decode(concatUint8Arrays(chunks));
  } catch {
    return { ok: false, response: jsonError(400, "Invalid UTF-8") };
  }

  const trimmed = decoded.trim();
  if (trimmed.length === 0) {
    return { ok: false, response: jsonError(400, "Empty JSON body") };
  }

  try {
    const value = JSON.parse(trimmed) as T;
    return { ok: true, value };
  } catch {
    return { ok: false, response: jsonError(400, "Malformed JSON") };
  }
}

function concatUint8Arrays(parts: Uint8Array[]): Uint8Array {
  if (parts.length === 0) return new Uint8Array(0);
  let len = 0;
  for (const p of parts) len += p.byteLength;
  const out = new Uint8Array(len);
  let offset = 0;
  for (const p of parts) {
    out.set(p, offset);
    offset += p.byteLength;
  }
  return out;
}

/** Trim string fields for simple forms — does not execute HTML; use before displaying or storing. */
export function sanitizePlainText(input: unknown, maxLen: number): string | null {
  if (typeof input !== "string") return null;
  const s = input.trim().replace(/\0/g, "").slice(0, maxLen);
  if (!s) return null;
  if (CTRL_OR_WS.test(s)) return null;
  return s;
}
