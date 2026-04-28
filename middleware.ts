import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, locales } from "./lib/i18n/config";

const PUBLIC_FILE = /\.[^/]+$/;

function pickLocale(req: NextRequest): string {
  // 1. Cookie wins if it's set to a known locale.
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;
  if (isLocale(cookieLocale)) return cookieLocale;

  // 2. Vercel geo — Japan → ja.
  const country = (req as unknown as { geo?: { country?: string } }).geo
    ?.country;
  if (country === "JP") return "ja";

  // 3. Accept-Language — anything starting with "ja" → ja, else en.
  const accept = req.headers.get("accept-language") ?? "";
  const primary = accept.split(",")[0]?.trim().toLowerCase() ?? "";
  if (primary.startsWith("ja")) return "ja";

  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Skip API, _next internals, anything with a file extension, well-known
  // root assets that live at the bare-domain level.
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname === "/install" ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // If the path already starts with a known locale, let it through.
  const first = pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();

  // Otherwise redirect to the resolved locale, preserving the path & query.
  const locale = pickLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Run on everything except API, Next internals, and static files.
    "/((?!api|install|_next/static|_next/image|_vercel|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};

// Re-export locales so tests/dev tools can import without reaching into lib/.
export const supportedLocales = locales;
