import { API_ROUTES } from "@/constant";
import api from "../apiService";
import { AxiosError } from "axios";
import { offerSchemaType } from "@/schema/offer";

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
