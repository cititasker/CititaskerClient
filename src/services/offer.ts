import { AxiosError } from "axios";
import api from "./apiService";
import { offerSchemaType } from "@/schema/offer";

export function makeOffer(data: offerSchemaType) {
  return api
    .post(`tasks/make-offer`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function updateOffer(data: offerSchemaType) {
  return api
    .put(`tasks/edit-offer`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function withdrawOffer(data: any) {
  return api
    .post(`tasks/cancel-offer`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function replyOffer(data: any) {
  return api
    .post(`tasks/reply-offer`, null, { params: data })
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function getOfferReply(data: any) {
  return api
    .post(`tasks/offer-replies`, null, { params: data })
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function acceptOffer(data: any) {
  return api
    .post(`tasks/accept-offer`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}
