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

export const MIDDLEWARE_CONFIG = {
  validRoles: ["poster", "tasker"] as const,

  // Routes that should trigger role-based redirection when accessed without role prefix
  protectedRoutes: [
    "dashboard",
    "my-tasks",
    "discovery",
    "profile",
    "settings",
    "notifications",
    "messages",
    "offers",
  ] as const,

  // Role-specific routes that have strict access control
  roleSpecificRoutes: {
    "browse-task": "tasker",
    "post-task": "poster",
  } as const,
} as const;

export type Role = (typeof MIDDLEWARE_CONFIG.validRoles)[number];
export type ProtectedRoute = (typeof MIDDLEWARE_CONFIG.protectedRoutes)[number];
export type RoleSpecificRoute =
  keyof typeof MIDDLEWARE_CONFIG.roleSpecificRoutes;
