import { API_ROUTES, ROUTES } from "@/constant";
import api from "@/services/apiService";
import { AxiosError } from "axios";

export function getAllTasks(data: any) {
  return api
    .get(API_ROUTES.TASKS, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function getUserTasks({ status }: any) {
  const urlParams = new URLSearchParams();
  if (status) urlParams.set("status", status);
  return api
    .get(`${API_ROUTES.USER_TASKS}?${urlParams}`)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function getUserTaskById(id: string) {
  return api
    .get(`${API_ROUTES.GET_USER_TASK}/${id}`)
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
