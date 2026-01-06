import { API_ROUTES } from "@/constant";
import api from "../apiService";
import { AxiosError } from "axios";
import { DisputeRes } from "@/lib/types/dispute.types";

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
  getDispute: (id: string): Promise<DisputeRes> => {
    return api
      .get(`${API_ROUTES.DISPUTE.GET_ALL}?task_id=${id}`)
      .then((data) => {
        return data.data;
      })
      .catch((error: AxiosError) => {
        throw error.response?.data;
      });
  },
  rejectProposal: (data: any) => {
    return api
      .post(API_ROUTES.DISPUTE.REJECT_PROPOSAL, data)
      .then((data) => {
        return data.data;
      })
      .catch((error: AxiosError) => {
        throw error.response?.data;
      });
  },
  updateProposal: (data: any) => {
    return api
      .post(API_ROUTES.DISPUTE.UPDATE_PROPOSAL, data)
      .then((data) => {
        return data.data;
      })
      .catch((error: AxiosError) => {
        throw error.response?.data;
      });
  },
};
