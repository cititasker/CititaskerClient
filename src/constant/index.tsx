import Icons from "@/components/Icons";

export const maxLengthChar = 200;
export const connectionFee = 10;

export const PORTFOLIO_STORAGE_KEY = "portfolio_pending_images";
export const MAX_IMAGES = 8;
export const DATE_TIME_FORMAT = "MMM DD, YYYY hh:mm a";
export const DATE_FORMAT = "MMM DD, YYYY";

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
  CREATE_TASK: "/tasks/create",
  UPDATE_TASK: "tasks/update-task",
  MAKE_OFFER: "/tasks/make-offer",
  UPDATE_OFFER: "/tasks/edit-offer",
  OFFER_REPLIES: "/tasks/offer-replies",
  ACCEPT_OFFER: "/tasks/accept-offer",
  UPDATE_PROFILE_DETAILS: "/auth/update-account-details",
  GET_PROFILE_DETAILS: "/auth/fetch-user-account-details",
  GET_PORTFOLIO: "/auth/fetch-user-portfolio-details",
  UPDATE_PORTFOLIO: "/profile/portfolio",
  DELETE_PORTFOLIO: (key: string) => `/profile/portfolio/${key}`,
  CREATE_FAQ: "/faqs/create",
  GET_FAQ: "/faqs/user-faqs",
  UPDATE_FAQ: "/faqs/update",
  DELETE_FAQ: "/faqs/delete",
  GET_REVIEW_STATUS: "/tasks/reviews/status",
  GET_REVIEWS: "/tasks/reviews/task-reviews",
  GET_USER_REVIEW: (id: any) => `tasks/reviews/user-reviews/${id}`,
  POST_REVIEW: "/tasks/reviews",
  GET_QUESTIONS: "/tasks/questions",
  POST_QUESTION: "/tasks/post-question",
  REPLY_QUESTION: "/tasks/reply-question",
  REPLY_OFFER: "/tasks/reply-offer",
  COMPLETE_TASK: "/tasks/complete",
  RELEASE_PAYMENT: "/tasks/accept-payment-request",
  //Surcharge
  SURCHARGE_REQUEST: "tasks/surcharge/request",
  SURCHARGE_REJECT: "tasks/surcharge/reject",
  SURCHARGE_REQUEST_LIST: "tasks/surcharge/list",
  // Reschedule
  CREAT_TASK_RESCHEDULE: "/tasks/reschedule/create",
  REJECT_TASK_RESCHEDULE: "/tasks/reschedule/reject-counter",
  ACCEPT_TASK_RESCHEDULE: "/tasks/reschedule/accept-counter",
  APPROVE_TASK_RESCHEDULE: "/tasks/reschedule/approve",
  GET_RESCHEDULES: (id: string) => `/tasks/reschedule/history/${id}`,
  POSTER_RESCHEDULE_TASK: "/tasks/reschedule/reject-with-counter",
  TASKER_RESCHEDULE_TASK: "/tasks/reschedule/reject-counter",
  //Dashboard
  DASHBOARD_ANALYSIS: (role: TRole) => `dashboard/${role}`,
  DASHBOARD_STATS: (role: TRole) => `dashboard/${role}/kpis`,
  RECENT_TASKS: (role: TRole) => `dashboard/${role}/recent-tasks`,
  POSTER_EXPENSE_ANALYSIS: `dashboard/poster/expenses-chart`,
  TASKET_EARNING_ANALYSIS: `dashboard/tasker/earnings-chart`,
  AMOUNT_ANALYSIS: (role: TRole) => `dashboard/${role}/amount-chart`,

  TRANSACTION_HISTORY: "/payments/transactions",
  WITHDRAW: "/payments/withdraw",

  NOTIFICATIONS: {
    GET_ALL: "/notifications",
    UNREAD: "/notifications/unread",
    READ: "/notifications",
    READ_ALL: "/notifications/read-all",
    DELETE: "/notifications",
    DELETE_ALL_READ: "/notifications/read/all",
  },
  DISPUTE: {
    CREATE: "/tasks/disputes/create",
    GET_ALL: "/tasks/disputes/fetch",
  },
} as const;

const isProd = process.env.NEXT_PUBLIC_NODE_ENV === "production";

type RouteFunction = (role: "poster" | "tasker") => string;

export const ROUTES = {
  // Auth routes
  LOGIN: isProd ? "/waitlist" : "/auth/login",
  SIGNUP: isProd ? "/waitlist" : "/auth/signup",
  FORGOT_PASSWORD: "/auth/forgot-password",
  CREATE_ACCOUNT: "/auth/create-account",
  RESET_PASSWORD: "/auth/reset-password",
  OTP: "auth/otp",

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
  POSTER: isProd ? "/waitlist" : "/discovery-poster",
  TASKER: isProd ? "/waitlist" : "/discovery-tasker",
  WAITLIST: "/waitlist",
  POST_TASK: isProd ? "/waitlist" : "/post-task",
  BROWSE_TASK: "/browse-task",
  PUBLIC_PROFILE: "/profile",

  HOW_IT_WORKS: "/how-it-works",
  DISCOVERY: "/discovery",

  DASHBOARD_TRANSACTION: "/transactions",
  DASHBOARD_ACCOUNT: "/account",
  DASHBOARD_MESSAGE: "/message",
  DASHBOARD_PROFILE: "/profile",
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

export const REJECTION_REASON = {
  OFFER_TOO_SMALL: "offer_too_small",
  SCOPE_CHANGED: "scope_changed",
  WORKLOAD_MISMATCH: "workload_mismatch",
  ADDITIONAL_TASKS_ADDED: "additional_tasks_added",
  OTHER: "other",
} as const;

export const rejectionReasonOptions = [
  {
    id: REJECTION_REASON.OFFER_TOO_SMALL,
    name: "The offer was too small for the job",
  },
  {
    id: REJECTION_REASON.SCOPE_CHANGED,
    name: "The poster changed scope of work",
  },
  {
    id: REJECTION_REASON.WORKLOAD_MISMATCH,
    name: "The offer didn't match the workload.",
  },
  {
    id: REJECTION_REASON.ADDITIONAL_TASKS_ADDED,
    name: "The poster added a new task",
  },
  {
    id: REJECTION_REASON.OTHER,
    name: "Other reasons",
  },
] as const;

export type RejectionReason =
  (typeof REJECTION_REASON)[keyof typeof REJECTION_REASON];

export const surchargeReasons: Record<RejectionReason, string> =
  Object.fromEntries(
    rejectionReasonOptions.map((opt) => [opt.id, opt.name])
  ) as Record<RejectionReason, string>;

export const TIME_OPTIONS = [
  {
    value: "morning",
    title: "Morning",
    description: "Before 10am",
    icon: <Icons.twilight className="text-xl" />,
  },
  {
    value: "mid_day",
    title: "Mid-day",
    description: "10am - 2pm",
    icon: <Icons.clearDay className="text-xl" />,
  },
  {
    value: "afternoon",
    title: "Afternoon",
    description: "2pm - 6pm",
    icon: <Icons.lightMode className="text-xl" />,
  },
  {
    value: "evening",
    title: "Evening",
    description: "After 6pm",
    icon: <Icons.nightStay className="text-xl" />,
  },
];

export const FORMATTED_OPTIONS = TIME_OPTIONS.map((el) => ({
  id: el.value,
  name: el.title,
  description: el.description,
}));

export const DEFAULT_TIME_OPTIONS = [
  { value: "this-week", label: "This week" },
  { value: "this-month", label: "This month" },
  { value: "last-month", label: "Last month" },
  { value: "all-time", label: "All time" },
];
