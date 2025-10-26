// lib/middleware/guards/role-guard.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { MIDDLEWARE_CONFIG, type Role } from "../config";
import { ROUTES } from "@/constant";

interface User {
  role: TRole;
  [key: string]: any;
}

// Check role-specific route access
export function checkRoleSpecificAccess(
  pathname: string,
  userRole: TRole
): { hasAccess: boolean; redirectPath?: string } {
  for (const [route, requiredRole] of Object.entries(
    MIDDLEWARE_CONFIG.roleSpecificRoutes
  )) {
    if (pathname.includes(route)) {
      if (userRole !== requiredRole) {
        return {
          hasAccess: false,
          redirectPath: ROUTES.getDashboard(userRole),
        };
      }
      return { hasAccess: true };
    }
  }

  return { hasAccess: true };
}

// Handle role-based redirections
export function checkRoleBasedRedirection(
  pathname: string,
  userRole: string
): { needsRedirect: boolean; redirectPath?: string } {
  const containsProtectedRoute = MIDDLEWARE_CONFIG.protectedRoutes.some(
    (route) => pathname.includes(route)
  );

  if (!containsProtectedRoute) {
    return { needsRedirect: false };
  }

  const pathParts = pathname.split("/").filter(Boolean);
  const currentRoleFromPath = pathParts[0];

  // Direct access to route without role prefix (e.g., /dashboard)
  if (
    MIDDLEWARE_CONFIG.protectedRoutes.some((route) => pathname === `/${route}`)
  ) {
    return {
      needsRedirect: true,
      redirectPath: `/${userRole}/${pathname.substring(1)}`,
    };
  }

  // Access with sub-routes but no role prefix (e.g., /my-tasks/123)
  if (
    !MIDDLEWARE_CONFIG.validRoles.includes(currentRoleFromPath as Role) &&
    containsProtectedRoute
  ) {
    const protectedRoute = MIDDLEWARE_CONFIG.protectedRoutes.find((route) =>
      pathname.includes(route)
    );
    if (protectedRoute) {
      const routeIndex = pathname.indexOf(protectedRoute);
      const subPath = pathname.substring(routeIndex);
      return {
        needsRedirect: true,
        redirectPath: `/${userRole}/${subPath}`,
      };
    }
  }

  // Wrong role prefix (e.g., poster accessing /tasker/dashboard)
  if (
    MIDDLEWARE_CONFIG.validRoles.includes(currentRoleFromPath as Role) &&
    currentRoleFromPath !== userRole
  ) {
    const pathWithoutRole = pathname.substring(currentRoleFromPath.length + 1);
    return {
      needsRedirect: true,
      redirectPath: `/${userRole}${
        pathWithoutRole.startsWith("/")
          ? pathWithoutRole
          : `/${pathWithoutRole}`
      }`,
    };
  }

  return { needsRedirect: false };
}

export function handleRoleAccess(
  req: NextRequest,
  user: User
): NextResponse | null {
  const currentRoute = req.nextUrl.pathname;
  const userRole = user.role.toLowerCase() as TRole;

  // Check role-specific route access
  const { hasAccess, redirectPath: roleRedirectPath } = checkRoleSpecificAccess(
    currentRoute,
    userRole
  );

  if (!hasAccess && roleRedirectPath) {
    const absoluteURL = new URL(roleRedirectPath, req.url);
    return NextResponse.redirect(absoluteURL);
  }

  // Handle general role-based route redirection
  const { needsRedirect, redirectPath } = checkRoleBasedRedirection(
    currentRoute,
    userRole
  );

  if (needsRedirect && redirectPath && redirectPath !== currentRoute) {
    const absoluteURL = new URL(redirectPath, req.url);
    return NextResponse.redirect(absoluteURL);
  }

  return null;
}
