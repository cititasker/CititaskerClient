import { AxiosError } from "axios";
import api from "./apiService";
import { offerSchemaType } from "@/schema/offer";
import { API_ROUTES } from "@/constant";

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
    .post(API_ROUTES.ACCEPT_OFFER, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}
