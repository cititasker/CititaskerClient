import { AxiosError } from "axios";
import api from "./apiService";
import { API_ROUTES } from "@/constant";

export function createTask(data: any) {
  return api
    .post(`tasks/create`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function updateTask(data: any) {
  return api
    .post(`tasks/update-task`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

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

export function getSingleTask(id: string) {
  return api
    .get(`tasks/single/${id}`)
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
    .get(`tasks/user?${urlParams}`)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function getUserTaskById(id: string) {
  return api
    .get(`tasks/user/single/${id}`)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function requestPayment(data: any) {
  return api
    .post(`tasks/request-payment`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}
