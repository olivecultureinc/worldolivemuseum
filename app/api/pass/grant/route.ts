// app/api/pass/grant/route.ts
import { NextResponse } from "next/server";

function grantResponse() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set("weekly_pass", "1", {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: false,
    sameSite: "lax",
  });

  return res;
}

export async function POST(req: Request) {
  // 🚨 Allow direct grant only in development
  if (process.env.NODE_ENV === "development") {
    return grantResponse();
  }

  // 🔐 In production, require internal secret
  const authHeader = req.headers.get("x-internal-key");

  if (authHeader !== process.env.INTERNAL_GRANT_SECRET) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 403 }
    );
  }

  return grantResponse();
}

export async function GET() {
  // ❌ Disable GET in production
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Not allowed" },
      { status: 403 }
    );
  }

  return grantResponse();
}