import { auth } from "@/auth";
import { NextResponse } from "next/server";
import {
  getDefaultRedirect,
  isAuthRoute,
  isPublicRoute,
  isProtectedRoute,
  getRoleForRoute,
} from "@/lib/middleware/guards/route-config";
import {
  shouldRedirectToWaitlist,
  WAITLIST_CONFIG,
} from "@/lib/middleware/waitlist-redirect";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user;
  const role = user?.role?.toLowerCase() as "poster" | "tasker" | undefined;

  if (shouldRedirectToWaitlist(pathname)) {
    return NextResponse.redirect(
      new URL(WAITLIST_CONFIG.WAITLIST_PATH, req.url)
    );
  }

  // 1. Homepage: redirect authenticated users to discovery page
  if (pathname === "/") {
    if (user && role) {
      return NextResponse.redirect(new URL(getDefaultRedirect(role), req.url));
    }
    return NextResponse.next();
  }

  // 2. Public routes: allow everyone
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // 3. Auth routes: redirect authenticated users away
  if (user && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL(getDefaultRedirect(role!), req.url));
  }

  // 4. Protected routes (/poster/*, /tasker/*): require auth + correct role
  if (isProtectedRoute(pathname)) {
    if (!user) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const routeRole = pathname.startsWith("/poster/") ? "poster" : "tasker";
    if (role !== routeRole) {
      return NextResponse.redirect(new URL(getDefaultRedirect(role!), req.url));
    }
  }

  // 5. Role-specific public routes (discovery, post-task, browse-tasks, etc.)
  const routeRole = getRoleForRoute(pathname);
  if (routeRole) {
    // Require authentication for role-specific routes
    if (!user) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Redirect if wrong role accessing route
    if (role !== routeRole) {
      return NextResponse.redirect(new URL(getDefaultRedirect(role!), req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
