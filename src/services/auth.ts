import {
  forgotPasswordSchemaType,
  loginSchemaType,
  passwordResetSchemaType,
  signupSchemaType,
  verifyEmailSchemaType,
  verifyPhoneSchemaType,
} from "@/schema/auth";
import api from "./apiService";
import { AxiosError } from "axios";
import { QUERY_PATHS } from "@/constant";

export function registerApi(data: loginSchemaType) {
  return api
    .post(`auth/registration`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function loginApi(data: loginSchemaType) {
  return api
    .post(`auth/login`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function resendEmailVerificationApi() {
  return api
    .post(`auth/resend-email-verification-token`)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function forgotPasswordApi(data: forgotPasswordSchemaType) {
  return api
    .post(`auth/send-password-reset-link`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function otpApi(data: verifyEmailSchemaType) {
  return api
    .post(`auth/verify-email`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function resetPasswordApi(data: passwordResetSchemaType) {
  return api
    .post(`auth/reset-password`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function sendPhoneVerificationToken(data: verifyPhoneSchemaType) {
  return api
    .post(`auth/send-phone-verification-token`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function verifyPhoneNumber(data: { token: string }) {
  return api
    .post(`auth/verify-phone-number`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function completeOnboarding(data: signupSchemaType) {
  return api
    .post(
      `auth/complete-onboarding
`,
      data
    )
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function changePassword(data: any) {
  return api
    .post(`auth/change-password`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function googleAuth() {
  return api
    .get(`auth/google`)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function updateBankDetails(data: any): Promise<any> {
  return api
    .post(QUERY_PATHS.AUTH.UPDATE_BANK_DETAILS, data)
    .then((data) => {
      return data.data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}
