import { AxiosError } from "axios";
import { API_ROUTES } from "@/constant";
import api from "../apiService";

export function getUserApi() {
  return api
    .get(API_ROUTES.GET_USER_DETAILS)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function uploadProfile(data: any) {
  return api
    .post(API_ROUTES.UPLOAD_PROFILE, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function updateProfile(data: any) {
  return api
    .put(API_ROUTES.UPDATE_PROFILE, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}
