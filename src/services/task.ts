import { AxiosError } from "axios";
import api, { formDataApi, publicApi } from "./apiService";

export function createTask(data: any) {
  return formDataApi
    .post(`tasks/create`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function updateTask(data: any) {
  return formDataApi
    .post(`tasks/update-task`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function getAllTasks(data: any) {
  return publicApi
    .get(`tasks`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function getSingleTask(id: string) {
  return publicApi
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
