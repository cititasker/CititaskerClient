// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import {
  handleAuthRedirection,
  handleRoleBasedAuthentication,
} from "@/lib/middleware/guards/auth-guard";
import { handleRoleAccess } from "@/lib/middleware/guards/role-guard";

// ✅ Define routes that don't need auth checks
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/signup",
  "/about",
  "/forgot-password",
  "/reset-password",
  "/otp",
  "/create-account",
  "/waitlist",
  "/poster/how-it-works",
  "/tasker/how-it-works",
  "/poster/discovery",
  "/tasker/discovery",
  "/legal/privacy-policy",
  "/legal/terms-and-conditions",
  "/legal/community-guidelines",
];

const PUBLIC_PREFIXES = ["/legal"];

// ✅ Routes that need minimal checks
const STATIC_ROUTES = [
  "/browse-task", // Public task browsing
];

function isPublicRoute(pathname: string): boolean {
  // Check exact matches
  if (PUBLIC_ROUTES.includes(pathname)) return true;

  // Check prefixes
  if (PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix)))
    return true;

  return false;
}

function isStaticRoute(pathname: string): boolean {
  return STATIC_ROUTES.some((route) => pathname === route);
}

export default auth(async (req) => {
  const { pathname } = req.nextUrl;

  // ✅ CRITICAL: Skip auth checks for public routes (no session call needed)
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // ✅ For static routes, allow access but don't redirect
  if (isStaticRoute(pathname)) {
    return NextResponse.next();
  }

  const user = req.auth?.user;

  // 1. Handle authentication redirections
  const authRedirect = handleAuthRedirection(req, user);
  if (authRedirect) return authRedirect;

  // 2. Handle role-based route authentication (require login for protected routes)
  const roleAuthRedirect = handleRoleBasedAuthentication(req, user);
  if (roleAuthRedirect) return roleAuthRedirect;

  // 3. Handle role-based access control and redirections (for authenticated users)
  if (user?.role) {
    const roleAccessRedirect = handleRoleAccess(req, user);
    if (roleAccessRedirect) return roleAccessRedirect;
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api/auth routes (NextAuth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon, sitemap, robots
     * - public assets
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|videos).*)",
  ],
};
