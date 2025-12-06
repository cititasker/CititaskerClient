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

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user;
  const role = user?.role?.toLowerCase() as "poster" | "tasker" | undefined;

  // 0. Allow public routes (profiles, landing page, etc.) - no restrictions
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // 1. Redirect authenticated users away from /auth/* pages
  if (user && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL(getDefaultRedirect(role!), req.url));
  }

  // 2. Protect role-prefixed routes (/poster/*, /tasker/*)
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

  // 3. Handle role-specific public routes (when logged in)
  if (user && isWrongRoleForPublicRoute(pathname, role!)) {
    return NextResponse.redirect(new URL(getFallbackRedirect(role!), req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/auth/:path*",
    "/poster/:path*",
    "/tasker/:path*",
    "/browse-tasks/:path*",
    "/post-task/:path*",
    "/how-it-works-poster/:path*",
    "/how-it-works-tasker/:path*",
    "/discovery-poster/:path*",
    "/discovery-tasker/:path*",
    "/poster-profile/:path*",
    "/tasker-profile/:path*",
  ],
};
