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

export function getUserTasks() {
  return api
    .get(`tasks/user`)
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
