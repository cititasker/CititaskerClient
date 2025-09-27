import { API_ROUTES } from "@/constant";
import api from "../apiService";
import { AxiosError } from "axios";
import { offerSchemaType } from "@/schema/offer";
import { IOfferReplies } from "./offers.types";

// OFFERS
export function makeOffer(data: offerSchemaType) {
  return api
    .post(API_ROUTES.MAKE_OFFER, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function updateOffer(data: offerSchemaType) {
  return api
    .put(API_ROUTES.UPDATE_OFFER, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function getOfferReplies(id: string): Promise<{ data: IOfferReplies }> {
  return api
    .get(`${API_ROUTES.OFFER_REPLIES}?offer_id=${id}`)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function replyOffer(data: any) {
  return api
    .post(API_ROUTES.REPLY_OFFER, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}
