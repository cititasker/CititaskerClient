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
import signupApi from "./signupApi";

export function registerApi(data: loginSchemaType) {
  return signupApi
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
  return signupApi
    .post(`auth/resend-email-verification-token`)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function forgotPasswordApi(data: forgotPasswordSchemaType) {
  return signupApi
    .post(`auth/send-password-reset-link`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function otpApi(data: verifyEmailSchemaType) {
  return signupApi
    .post(`auth/verify-email`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function resetPasswordApi(data: passwordResetSchemaType) {
  return signupApi
    .post(`auth/reset-password`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function sendPhoneVerificationToken(data: verifyPhoneSchemaType) {
  return signupApi
    .post(`auth/send-phone-verification-token`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function verifyPhoneNumber(data: { token: string }) {
  return signupApi
    .post(`auth/verify-phone-number`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function completeOnboarding(data: signupSchemaType) {
  return signupApi
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
  return signupApi
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
