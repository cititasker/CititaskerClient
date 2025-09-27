export const maxLengthChar = 200;
export const connectionFee = 10;

export enum ROLE {
  poster = "poster",
  tasker = "tasker",
}

export enum TASK_STATUS {
  open = "open",
  assigned = "assigned",
  completed = "completed",
}

export const API_ROUTES = {
  AUTH: {
    SIGN_IN: "/auth/sign-in",
    REGISTER: {
      SETUP: "/auth/setup-account",
      SIGN_UP: "/auth/sign-up",
    },
    UPDATE_BANK_DETAILS: "/auth/update-bank-details",
  },
  UTILITY: {
    BANKS: "/utility/banks",
    VERIFY_ACCOUNT_NUMBER: "/utility/verify-account-details",
    CATEGORIES: "/utility/categories",
    SUB_CATEGORY: "/utility/sub-categories",
  },
  LOGIN: "/auth/login",
  GET_USER_DETAILS: "auth/user-details",
  SWITCH_ROLE: "auth/switch-role",

  TASKS: "/tasks",
  USER_TASKS: "/tasks/user",
  UPLOAD_PROFILE: "auth/upload-profile-image",
  UPDATE_PROFILE: "auth/update-profile",

  // UPDATE_TASK: (id: string) => `/tasks/${id}`,
  DELETE_TASK: (id: string) => `/tasks/${id}`,

  TASKER: {
    GET_TASKER_PROFILE: "/tasker/profile",
    UPDATE_TASKER_PROFILE: "/tasker/profile/update",
    GET_TASKER_TASKS: "/tasker/tasks",
    GET_TASKER_TASK_BY_ID: (id: string) => `/tasker/tasks/${id}`,
    CREATE_TASKER_TASK: "/tasker/tasks/create",
    UPDATE_TASKER_TASK: (id: string) => `/tasker/tasks/${id}`,
    DELETE_TASKER_TASK: (id: string) => `/tasker/tasks/${id}`,
  },

  CREATE_PAYMENT_INTENT: "/payments/create-intent",
  GET_USER_TASK: "tasks/user/single",
  CREATE_TASK: "/tasks/create",
  UPDATE_TASK: "tasks/update-task",
  GET_TASK_BY_ID: "/tasks/single",
  MAKE_OFFER: "/tasks/make-offer",
  UPDATE_OFFER: "/tasks/edit-offer",
  OFFER_REPLIES: "/tasks/offer-replies",
  ACCEPT_OFFER: "/tasks/accept-offer",
  UPDATE_PROFILE_DETAILS: "/auth/update-account-details",
  GET_PROFILE_DETAILS: "/auth/fetch-user-account-details",
  GET_PORTFOLIO: "/auth/fetch-user-portfolio-details",
  UPDATE_PORTFOLIO: "/profile/portfolio",
  DELETE_PORTFOLIO: "/auth/remove-portfolio-image",
  CREATE_FAQ: "/faqs/create",
  GET_FAQ: "/faqs/user-faqs",
  UPDATE_FAQ: "/faqs/update",
  DELETE_FAQ: "/faqs/delete",
  GET_REVIEWS: "/tasks/reviews",
  POST_REVIEW: "/tasks/review",
  GET_QUESTIONS: "/tasks/questions",
  POST_QUESTION: "/tasks/post-question",
  REPLY_QUESTION: "/tasks/reply-question",
  REPLY_OFFER: "/tasks/reply-offer",
} as const;

const isProd = process.env.NEXT_PUBLIC_NODE_ENV === "production";

type RouteFunction = (role: "poster" | "tasker") => string;

export const ROUTES = {
  // Auth routes
  LOGIN: isProd ? "/waitlist" : "/login",
  SIGNUP: isProd ? "/waitlist" : "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  CREATE_ACCOUNT: "/create-account",
  RESET_PASSWORD: "/reset-password",
  OTP: "/otp",

  // Static routes
  HOME: "/",
  PROFILE: "/dashboard/profile",
  ACCOUNT: "/dashboard/account",

  // Role-based route templates
  DASHBOARD_TEMPLATE: "/{role}/dashboard",
  MY_TASKS_TEMPLATE: "/{role}/my-tasks",
  SETTINGS_TEMPLATE: "/{role}/settings",

  // Helper functions for dynamic routes
  getDashboard: ((role: UserRole) => `/${role}/dashboard`) as RouteFunction,
  getMyTasks: ((role: UserRole) => `/${role}/my-tasks`) as RouteFunction,
  getSettings: ((role: UserRole) => `/${role}/settings`) as RouteFunction,
  getTaskDetails: (role: UserRole, taskId: string) =>
    `/${role}/my-tasks/${taskId}`,

  // Role-specific constants (for convenience)
  POSTERs: {
    DASHBOARD: "/poster/dashboard",
    MY_TASKS: "/poster/my-tasks",
    SETTINGS: "/poster/settings",
  },
  TASKERs: {
    DASHBOARD: "/tasker/dashboard",
    MY_TASKS: "/tasker/my-tasks",
    SETTINGS: "/tasker/settings",
  },

  MY_TASKS: "/my-tasks",
  DASHBOARD: "/dashboard",
  POSTER: isProd ? "/waitlist" : "/discovery/poster",
  TASKER: isProd ? "/waitlist" : "/discovery/tasker",
  WAITLIST: "/waitlist",
  POST_TASK: isProd ? "/waitlist" : "/post-task",
  BROWSE_TASK: "/browse-task",
  PUBLIC_PROFILE: "/profile",

  HOW_IT_WORKS: "/how-it-works",
  DISCOVERY: "/discovery",

  DASHBOARD_TASKER: "/tasker/dashboard",
  DASHBOARD_PAYMENT: "/dashboard/payment",
  DASHBOARD_ACCOUNT: "/dashboard/account",
  DASHBOARD_MESSAGE: "/dashboard/message",
  DASHBOARD_PROFILE: "/dashboard/profile",
} as const;

export type UserRole = "poster" | "tasker";

export const animationVariants = {
  enterFromLeft: { x: 100, opacity: 0 },
  enterFromRight: { x: -100, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: -100, opacity: 0 },
  exitToRight: { x: 100, opacity: 0 },
} as const;

// Simplified animation variants
export const animationVariant = {
  enter: {
    opacity: 0,
    scale: 0.96,
    y: 10,
  },
  center: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -10,
  },
};

export const LOCATION_TYPE: Record<LocationTypeT, string> = {
  in_person: "In Person",
  online: "Remote",
};
