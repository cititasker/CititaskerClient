export const maxLengthChar = 200;
export const connectionFee = 10;

export enum ROLE {
  poster = "poster",
  tasker = "tasker",
}

export enum TASK_STATUS {
  open="open",
  assigned="assigned",
  completed="completed",
};

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
    CATEGORY: "/utility/categories",
    SUB_CATEGORY: "/utility/sub-categories",
  },
  LOGIN: "/auth/login",
  GET_USER_DETAILS: "auth/user-details",

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
  UPDATE_PROFILE_DETAILS: "/auth/update-account-details",
  GET_PROFILE_DETAILS: "/auth/fetch-user-account-details",
  GET_PORTFOLIO: "/auth/fetch-user-portfolio-details",
  UPDATE_PORTFOLIO: "/auth/update-portfolio",
  DELETE_PORTFOLIO: "/auth/remove-portfolio-image",
  CREATE_FAQ: "/faqs/create",
  GET_FAQ: "/faqs/user-faqs",
  UPDATE_FAQ: "/faqs/update",
  DELETE_FAQ: "/faqs/delete",
  GET_REVIEWS: "/tasks/reviews",
  POST_REVIEW: "/tasks/review",
};

const isProd = process.env.NEXT_PUBLIC_NODE_ENV === "production";

export const ROUTES = {
  HOME: "/",
  MY_TASKS: "/my-tasks",
  LOGIN: isProd ? "/waitlist" : "/login",
  SIGNUP: isProd ? "/waitlist" : "/signup",
  CREATE_ACCOUNT: "/create-account",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/dashboard",
  POSTER: isProd ? "/waitlist" : "/discovery/poster",
  TASKER: isProd ? "/waitlist" : "/discovery/tasker",
  WAITLIST: "/waitlist",
  POST_TASK: isProd ? "/waitlist" : "/post-task",
  BROWSE_TASK: "/browse-task",
  PUBLIC_PROFILE: "/profile",

  HOW_IT_WORKS:"/how-it-works",
  DISCOVERY:"/discovery",

  // Dashboard
  DASHBOARD_PAYMENT: "/dashboard/payment",
  DASHBOARD_ACCOUNT: "/dashboard/account",
  DASHBOARD_MESSAGE: "/dashboard/message",
  DASHBOARD_PROFILE: "/dashboard/profile",
} as const;

export const animationVariants = {
  enterFromLeft: { x: 100, opacity: 0 },
  enterFromRight: { x: -100, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: -100, opacity: 0 },
  exitToRight: { x: 100, opacity: 0 },
} as const;
