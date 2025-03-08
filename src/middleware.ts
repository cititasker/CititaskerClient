import { auth } from "@/auth";
import { NextResponse } from "next/server";

const authRoutes = ["/login", "/signup", "/forgot-password"];
const protectedRoutes = ["/dashboard"]; // Routes that require authentication

export default auth(async (req) => {
  const currentRoute = req.nextUrl.pathname;

  if (req.auth && authRoutes.includes(currentRoute)) {
    const absoluteURL = new URL("/dashboard", req.url);
    return Response.redirect(absoluteURL);
  }
  if (
    !req.auth &&
    protectedRoutes.some((route) => currentRoute.startsWith(route))
  ) {
    const absoluteURL = new URL("/login", req.url); // Redirect to login page
    return Response.redirect(absoluteURL);
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/my-tasks/:path*",
    "/profile",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
