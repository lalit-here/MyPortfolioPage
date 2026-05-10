import { validateApiRequestUrl } from "@/lib/input-validation";
import {
  attachRateLimitHeaders,
  checkRateLimit,
  getClientIp,
  isLoginRoute,
  json429,
} from "@/lib/rate-limit";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const urlCheck = validateApiRequestUrl(request.nextUrl);
  if (!urlCheck.ok) {
    return urlCheck.response;
  }

  try {
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
  } catch {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }
}

export const config = {
  matcher: ["/api/:path*"],
};