import { AxiosError } from "axios";
import api from "./apiService";
import { API_ROUTES } from "@/constant";

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
  return api
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
    .post(API_ROUTES.CREATE_PAYMENT_INTENT, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}
