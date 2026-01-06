// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import {
  getDefaultRedirect,
  getFallbackRedirect,
  isAuthRoute,
  isPublicRoute,
  isProtectedRoute,
  isWrongRoleForPublicRoute,
} from "@/lib/middleware/guards/route-config";
import {
  shouldRedirectToWaitlist,
  WAITLIST_CONFIG,
} from "@/lib/middleware/waitlist-redirect";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get("host") || "";
  const user = req.auth?.user;
  const role = user?.role?.toLowerCase() as "poster" | "tasker" | undefined;

  // ========================================
  // TEMPORARY: Production Waitlist Redirect
  // ========================================
  // TO REMOVE: Set ENABLED to false in waitlist-redirect.ts
  // or delete lib/middleware/waitlist-redirect.ts entirely
  // ========================================
  if (shouldRedirectToWaitlist(hostname, pathname)) {
    return NextResponse.redirect(
      new URL(WAITLIST_CONFIG.WAITLIST_PATH, req.url)
    );
  }

  // 0. Homepage handling: redirect authenticated users to their discovery page
  if (pathname === "/") {
    if (user && role) {
      return NextResponse.redirect(new URL(getDefaultRedirect(role), req.url));
    }
    // Allow unauthenticated users to access homepage
    return NextResponse.next();
  }

  // 1. Allow public routes (profiles, about, contact, etc.)
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // 2. Redirect authenticated users away from /auth/* pages
  if (user && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL(getDefaultRedirect(role!), req.url));
  }

  // 3. Protect role-prefixed routes (/poster/*, /tasker/*)
  if (isProtectedRoute(pathname)) {
    // Require authentication
    if (!user) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check if accessing wrong role's routes
    const routeRole = pathname.startsWith("/poster/") ? "poster" : "tasker";
    if (role !== routeRole) {
      return NextResponse.redirect(new URL(getDefaultRedirect(role!), req.url));
    }
  }

  // 4. Handle role-specific routes (discovery pages, task posting/browsing, etc.)
  if (user && isWrongRoleForPublicRoute(pathname, role!)) {
    return NextResponse.redirect(new URL(getFallbackRedirect(role!), req.url));
  }

  // 5. Protect discovery pages - require authentication
  const discoveryPages = ["/discovery-poster", "/discovery-tasker"];
  if (discoveryPages.some((page) => pathname.startsWith(page))) {
    if (!user) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
