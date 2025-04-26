import { AxiosError } from "axios";
import api, { formDataApi } from "./apiService";

export function getUserApi() {
  return api
    .get(`auth/user-details`)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function uploadProfile(data: any) {
  return formDataApi
    .post(`auth/upload-profile-image`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function updateProfile(data: any) {
  return api
    .put(`auth/update-profile`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function paymentReference(data: any) {
  return api
    .post(`payments/create-intent`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function verifyBank(data: any) {
  const queryParams = new URLSearchParams(data).toString();
  return api
    .post(`utility/verify-account-details?${queryParams}`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}
