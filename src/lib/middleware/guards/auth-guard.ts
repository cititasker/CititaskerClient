// lib/middleware/guards/auth-guard.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AUTH_ROUTES, ROLE_BASED_ROUTES } from "../config";
import { ROUTES } from "@/constant";

interface User {
  role: TRole;
  [key: string]: any;
}

export function handleAuthRedirection(
  req: NextRequest,
  user: User | undefined
): NextResponse | null {
  const currentRoute = req.nextUrl.pathname;

  // Redirect authenticated users away from auth pages
  if (user && AUTH_ROUTES.includes(currentRoute as any)) {
    const redirectTo = ROUTES.getDashboard(user.role);
    const absoluteURL = new URL(redirectTo, req.url);
    return NextResponse.redirect(absoluteURL);
  }

  return null;
}

export function handleRoleBasedAuthentication(
  req: NextRequest,
  user: User | undefined
): NextResponse | null {
  const currentRoute = req.nextUrl.pathname;

  // Check if route starts with a role-based prefix
  const isRoleBasedRoute = ROLE_BASED_ROUTES.some((prefix) =>
    currentRoute.startsWith(prefix)
  );

  if (isRoleBasedRoute && !user) {
    const absoluteURL = new URL(ROUTES.LOGIN, req.url);
    return NextResponse.redirect(absoluteURL);
  }

  return null;
}
