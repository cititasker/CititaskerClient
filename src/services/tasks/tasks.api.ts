import { API_ROUTES } from "@/constant";
import api from "@/services/apiService";
import { AxiosError } from "axios";
import { TaskData } from "./tasks.types";

export const getAllTasks = async (
  queryParams?: Record<string, any>
): Promise<TaskData> => {
  const query = new URLSearchParams(queryParams).toString();

  return api
    .get(`${API_ROUTES.TASKS}?${query}`)
    .then((data) => data.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
};

export function getTaskById(id: string) {
  return api
    .get(`${API_ROUTES.GET_TASK_BY_ID}/${id}`)
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
    .get(`${API_ROUTES.GET_TASK_BY_ID}/${id}`)
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

export function createTask(data: any) {
  return api
    .post(API_ROUTES.CREATE_TASK, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function updateTask(data: any) {
  return api
    .post(API_ROUTES.UPDATE_TASK, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}
