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
  publicRoutes: [
    "/about",
    "/contact",
    "/legal",
    "/poster-profile",
    "/tasker-profile",
    "/waitlist",
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

  // Default redirects by role
  defaultRedirects: {
    poster: "/discovery-poster",
    tasker: "/discovery-tasker",
  },
} as const;

type Role = "poster" | "tasker";

export function getDefaultRedirect(role: Role): string {
  return ROUTE_CONFIG.defaultRedirects[role];
}

export function isAuthRoute(pathname: string): boolean {
  return pathname.startsWith(ROUTE_CONFIG.authPrefix);
}

export function isPublicRoute(pathname: string): boolean {
  // Homepage is handled separately in middleware
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
