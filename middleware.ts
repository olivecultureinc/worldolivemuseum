import { NextResponse, type NextRequest } from "next/server";

//
// ----------------------------------------------------
// Configuration
// ----------------------------------------------------
const SUPPORTED = ["en", "fr"] as const;
type Lang = (typeof SUPPORTED)[number];

const DEFAULT_LANG: Lang = "en"; // 🌟 Your requirement: ALWAYS default to EN
const PAYWALL_DISABLED = process.env.NEXT_PUBLIC_DISABLE_PAYWALL === "1";


//
// ----------------------------------------------------
// Helper: Extract lang from URL
// ----------------------------------------------------
function getLangFromSearch(req: NextRequest): Lang | null {
  const l = req.nextUrl.searchParams.get("lang");
  return SUPPORTED.includes(l as Lang) ? (l as Lang) : null;
}

function getLangFromCookie(req: NextRequest): Lang | null {
  const c = req.cookies.get("lang")?.value;
  return SUPPORTED.includes(c as Lang) ? (c as Lang) : null;
}


//
// ----------------------------------------------------
// Middleware
// ----------------------------------------------------
export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // GET LANGUAGE (priority: search param → cookie → default)
  let lang: Lang =
    getLangFromSearch(req) ??
    getLangFromCookie(req) ??
    DEFAULT_LANG;

  //
  // ----------------------------------------------------
  // 1. Always persist user's lang choice into a cookie
  // ----------------------------------------------------
  const res = NextResponse.next();

  res.cookies.set("lang", lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });

  //
  // ----------------------------------------------------
  // 2. If landing on "/", ensure ?lang= is attached (EN by default)
  // ----------------------------------------------------
  if (
  url.pathname === "/museum" ||
  url.pathname.startsWith("/museum/")
) {
  // allow static files inside public/museum
  const isStaticAsset =
    url.pathname.includes("/thumbnails/") ||
    url.pathname.includes("/hero/") ||
    url.pathname.includes("/exhibits/") ||
    url.pathname.match(/\.(png|jpg|jpeg|webp|svg)$/);

  if (isStaticAsset) {
    return res;
  }

  if (PAYWALL_DISABLED) return res;

  const hasPass = req.cookies.get("weekly_pass")?.value === "1";

  if (!hasPass) {
    const redirectUrl = new URL("/", req.url);
    redirectUrl.searchParams.set("paywall", "1");
    redirectUrl.searchParams.set("lang", lang);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

  //
  // ----------------------------------------------------
  // 3. Paywall protection for /museum
  // ----------------------------------------------------
  if (url.pathname.startsWith("/museum")) {
    if (PAYWALL_DISABLED) return res;

    const hasPass = req.cookies.get("weekly_pass")?.value === "1";

    if (!hasPass) {
      const redirectUrl = new URL("/", req.url);
      redirectUrl.searchParams.set("paywall", "1");
      redirectUrl.searchParams.set("lang", lang);

      return NextResponse.redirect(redirectUrl);
    }

    // Museum allowed
    return res;
  }

  //
  // ----------------------------------------------------
  // 4. For all other routes, do nothing (but keep cookie)
  // ----------------------------------------------------
  return res;
}

//
// ----------------------------------------------------
// Apply middleware only to museum + homepage
// ----------------------------------------------------
export const config = {
  matcher: [
    "/",
    "/museum/:path*",
  ],
};
