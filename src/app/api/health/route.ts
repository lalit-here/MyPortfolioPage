import { validateApiRequestUrl } from "@/lib/input-validation";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const checked = validateApiRequestUrl(request.nextUrl);
  if (!checked.ok) return checked.response;
  return NextResponse.json({ ok: true });
}

export function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}