export const maxLengthChar = 200;
export const connectionFee = 10;

export enum ROLE {
  poster = "poster",
  tasker = "tasker",
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
    CATEGORY: "/utility/categories",
    SUB_CATEGORY: "/utility/sub-categories",
  },
  LOGIN: "/auth/login",
  USER: "/auth/get-user",

  TASKS: "/tasks",
  USER_TASKS: "/tasks/user",
  // GET_TASK_BY_ID: (id: string) => `/tasks/${id}`,

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
};

const isProd = process.env.NODE_ENV === "production";

export const ROUTES = {
  MY_TASKS: "/my-tasks",
  LOGIN: isProd ? "/waitlist" : "/login",
  SIGNUP: isProd ? "/waitlist" : "/signup",
  CREATE_ACCOUNT: "/create-account",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/dashboard",
  POSTER: isProd ? "/waitlist" : "/poster",
  TASKER: isProd ? "/waitlist" : "/tasker",
  WAITLIST: "/waitlist",
  POST_TASK: isProd ? "/waitlist" : "/post-task",
  BROWSE_TASK: "/browse-task",
} as const;
