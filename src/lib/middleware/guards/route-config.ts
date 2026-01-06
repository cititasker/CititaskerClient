export const ROUTE_CONFIG = {
  // Routes accessible only when NOT logged in
  authPrefix: "/auth/",

  authRoutes: [
    "/auth/login",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/otp",
    "/auth/create-account",
  ],

  // Public routes that anyone can access (no restrictions)
  // NOTE: "/" is handled separately in middleware
  publicRoutes: [
    "/about",
    "/contact",
    "/legal",
    "/poster-profile",
    "/tasker-profile",
  ],

  // Routes that require specific roles (when logged in)
  roleSpecificPublic: {
    poster: [
      "/post-task",
      "/how-it-works-poster",
      "/discovery-poster", // Poster's homepage
    ],
    tasker: [
      "/browse-tasks",
      "/how-it-works-tasker",
      "/discovery-tasker", // Tasker's homepage
    ],
  },

  // Protected route prefixes (must be logged in)
  protectedPrefixes: ["/poster/", "/tasker/"],

  // Default redirects by role (used for homepage and auth redirects)
  defaultRedirects: {
    poster: "/discovery-poster",
    tasker: "/discovery-tasker",
  },

  // Fallback redirects when accessing wrong role's route
  fallbackRedirects: {
    poster: "/discovery-poster",
    tasker: "/discovery-tasker",
  },
} as const;

type Role = "poster" | "tasker";

// Helper functions
export function getDefaultRedirect(role: Role): string {
  return ROUTE_CONFIG.defaultRedirects[role];
}

export function getFallbackRedirect(role: Role): string {
  return ROUTE_CONFIG.fallbackRedirects[role];
}

export function isAuthRoute(pathname: string): boolean {
  return pathname.startsWith(ROUTE_CONFIG.authPrefix);
}

export function isPublicRoute(pathname: string): boolean {
  // Exclude homepage from public routes check - it's handled separately
  if (pathname === "/") return false;

  return ROUTE_CONFIG.publicRoutes.some((route) => pathname.startsWith(route));
}

export function isProtectedRoute(pathname: string): boolean {
  return ROUTE_CONFIG.protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );
}

export function getRoleForRoute(pathname: string): Role | null {
  for (const [role, routes] of Object.entries(
    ROUTE_CONFIG.roleSpecificPublic
  )) {
    if (routes.some((route) => pathname.startsWith(route))) {
      return role as Role;
    }
  }
  return null;
}

export function isWrongRoleForPublicRoute(
  pathname: string,
  userRole: Role
): boolean {
  const routeRole = getRoleForRoute(pathname);
  return routeRole !== null && routeRole !== userRole;
}

// New helper to check if discovery pages require authentication
export function requiresAuthentication(pathname: string): boolean {
  const discoveryPages = ["/discovery-poster", "/discovery-tasker"];
  return discoveryPages.some((page) => pathname.startsWith(page));
}
