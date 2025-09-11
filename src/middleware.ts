import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { ROUTES } from "./constant";

const authRoutes: string[] = [
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.CREATE_ACCOUNT,
  ROUTES.RESET_PASSWORD,
  ROUTES.OTP,
];

// Role-based route prefixes that require authentication
const roleBasedRoutes = ["/poster", "/tasker"];

export default auth(async (req) => {
  const currentRoute = req.nextUrl.pathname;
  const user = req.auth?.user;

  // Redirect authenticated users away from auth pages
  if (req.auth && user && authRoutes.includes(currentRoute)) {
    const userRole = user.role;
    const redirectTo = ROUTES.getDashboard(userRole);
    const absoluteURL = new URL(redirectTo, req.url);
    return Response.redirect(absoluteURL);
  }

  // Check if route starts with a role-based prefix
  const isRoleBasedRoute = roleBasedRoutes.some((prefix) =>
    currentRoute.startsWith(prefix)
  );

  if (isRoleBasedRoute) {
    // Route is role-based, check authentication
    if (!req.auth || !user) {
      const absoluteURL = new URL(ROUTES.LOGIN, req.url);
      return Response.redirect(absoluteURL);
    }

    // Extract role from route path
    const routeRole = currentRoute.split("/")[1]; // poster or tasker

    // Verify user's role matches the route
    if (user.role !== routeRole) {
      // Redirect to user's correct role dashboard
      const correctDashboard = ROUTES.getDashboard(user.role);
      const absoluteURL = new URL(correctDashboard, req.url);
      return Response.redirect(absoluteURL);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Protect all poster and tasker routes
    "/poster/:path*",
    "/tasker/:path*",
    // Other protected routes
    "/profile/:path*",
    // General matcher (excluding API, static files, etc.)
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
