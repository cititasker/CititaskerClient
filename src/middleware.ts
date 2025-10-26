// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import {
  handleAuthRedirection,
  handleRoleBasedAuthentication,
} from "@/lib/middleware/guards/auth-guard";
import { handleRoleAccess } from "@/lib/middleware/guards/role-guard";

export default auth(async (req) => {
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
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder and common static files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$).*)",
  ],
};
