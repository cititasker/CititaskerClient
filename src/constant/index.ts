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

export const ROUTES = { MY_TASKS: "/my-tasks" } as const;
