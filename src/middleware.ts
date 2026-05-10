import { NextRequest, NextResponse } from "next/server";
import {
  attachRateLimitHeaders,
  checkRateLimit,
  getClientIp,
  isLoginRoute,
  json429,
} from "@/lib/rate-limit";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const ip = getClientIp(request);

  if (isLoginRoute(pathname)) {
    const result = await checkRateLimit(ip, "login");

    if (!result.ok) {
      const retryAfter = Math.ceil((result.resetAt - Date.now()) / 1000);
      const res = json429(retryAfter, "Too many login attempts. Try again later.");
      attachRateLimitHeaders(res, result);
      return res;
    }

    const res = NextResponse.next();
    attachRateLimitHeaders(res, result);
    return res;
  }

  const result = await checkRateLimit(ip, "api");

  if (!result.ok) {
    const retryAfter = Math.ceil((result.resetAt - Date.now()) / 1000);
    const res = json429(retryAfter, "Too many requests. Try again later.");
    attachRateLimitHeaders(res, result);
    return res;
  }

  const res = NextResponse.next();
  attachRateLimitHeaders(res, result);
  return res;
}

export const config = {
  matcher: ["/api/:path*"],
};
