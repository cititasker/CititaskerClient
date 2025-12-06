import { ROUTES } from "@/constant";

export const AUTH_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.CREATE_ACCOUNT,
  ROUTES.RESET_PASSWORD,
  ROUTES.OTP,
] as const;

export const ROLE_BASED_ROUTES = ["/poster", "/tasker"] as const;

export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/waitlist",
  "/legal/privacy-policy",
  "/legal/terms-and-conditions",
  "/legal/community-guidelines",
] as const;

export const MIDDLEWARE_CONFIG = {
  validRoles: ["poster", "tasker"] as const,

  // Routes that require authentication and role-based access
  protectedRoutes: [
    "dashboard",
    "my-tasks",
    "profile",
    "settings",
    "notifications",
    "messages",
    "offers",
    "payments",
  ] as const,

  // Role-specific public routes (accessible to unauthenticated users, but blocked for wrong role)
  roleSpecificPublicRoutes: {
    "browse-tasks": {
      allowedRoles: ["tasker"],
      blockedRedirect: "/post-task",
    },
    "post-task": {
      allowedRoles: ["poster"],
      blockedRedirect: "/browse-tasks",
    },
    "how-it-works-tasker": {
      allowedRoles: ["tasker"],
      blockedRedirect: "/how-it-works-poster",
    },
    "how-it-works-poster": {
      allowedRoles: ["poster"],
      blockedRedirect: "/how-it-works-tasker",
    },
  } as const,
} as const;

export type Role = (typeof MIDDLEWARE_CONFIG.validRoles)[number];
export type ProtectedRoute = (typeof MIDDLEWARE_CONFIG.protectedRoutes)[number];
export type RoleSpecificPublicRoute =
  keyof typeof MIDDLEWARE_CONFIG.roleSpecificPublicRoutes;
