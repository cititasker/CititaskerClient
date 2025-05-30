import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { ROUTES } from "./constant";

const authRoutes: string[] = [
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.FORGOT_PASSWORD,
];
const protectedRoutes = [ROUTES.DASHBOARD]; // Routes that require authentication

export default auth(async (req) => {
  const currentRoute = req.nextUrl.pathname;

  if (req.auth && authRoutes.includes(currentRoute)) {
    const absoluteURL = new URL(ROUTES.DASHBOARD, req.url);
    return Response.redirect(absoluteURL);
  }
  if (
    !req.auth &&
    protectedRoutes.some((route) => currentRoute.startsWith(route))
  ) {
    const absoluteURL = new URL(ROUTES.LOGIN, req.url); // Redirect to login page
    return Response.redirect(absoluteURL);
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/poster/my-tasks/:path*",
    "/tasker/my-tasks/:path*",
    "/profile",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
