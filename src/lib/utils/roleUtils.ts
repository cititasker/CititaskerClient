export type UserRole = "poster" | "tasker";

export const ROLE_ROUTES = {
  poster: {
    allowed: ["/post-task", "/how-it-works-poster"],
    blocked: ["/browse-tasks", "/how-it-works-tasker"],
    default: "/post-task",
  },
  tasker: {
    allowed: ["/browse-tasks", "/how-it-works-tasker"],
    blocked: ["/post-task", "/how-it-works-poster"],
    default: "/browse-tasks",
  },
} as const;

export function canAccessRoute(
  role: UserRole | undefined,
  pathname: string
): boolean {
  if (!role) return true; // Unauthenticated users can access all public routes

  const roleRoutes = ROLE_ROUTES[role];

  // Check if route is blocked for this role
  const isBlocked = roleRoutes.blocked.some((route) =>
    pathname.startsWith(route)
  );
  if (isBlocked) return false;

  return true;
}

export function getDefaultRoute(role: UserRole): string {
  return ROLE_ROUTES[role].default;
}

export function getRoleDisplayName(role: UserRole): string {
  return role.charAt(0).toUpperCase() + role.slice(1);
}
