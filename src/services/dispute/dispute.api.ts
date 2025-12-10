import { API_ROUTES } from "@/constant";
import api from "../apiService";
import { AxiosError } from "axios";

export const disputesApi = {
  createDispute: (data: any) => {
    return api
      .post(API_ROUTES.DISPUTE.CREATE, data)
      .then((data) => {
        return data.data;
      })
      .catch((error: AxiosError) => {
        throw error.response?.data;
      });
  },
};
