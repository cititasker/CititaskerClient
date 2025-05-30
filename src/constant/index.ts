export const maxLengthChar = 200;
export const connectionFee = 10;

export enum ROLE {
  poster = "poster",
  tasker = "tasker",
}

export const QUERY_PATHS = {
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
  },
  LOGIN: "/auth/login",
  USER: "/auth/get-user",
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
