import { NextResponse } from "next/server";

export async function GET() {
  // 🚨 Disable in production
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Not available in production." },
      { status: 403 }
    );
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = NextResponse.redirect(new URL("/museum", baseUrl));

  // 7 days in seconds
  const maxAge = 7 * 24 * 60 * 60;

  res.cookies.set({
    name: "weekly_pass",
    value: "1",
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    maxAge,
  });

  return res;
}