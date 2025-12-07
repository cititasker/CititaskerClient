import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import {
  ISurchargeRequestPayload,
  OfferResponse,
  UseMakeOrUpdateOfferArgs,
} from "./offers.types";
import { offerSchemaType } from "@/schema/offer";
import {
  getOfferReplies,
  makeOffer,
  rejectSurchargeRequest,
  replyOffer,
  surchargeList,
  surchargeRequest,
  updateOffer,
} from "./offers.api";
import { API_ROUTES } from "@/constant";
import { useBaseMutation } from "@/hooks/useBaseMutation";

export const useMakeOrUpdateOffer = ({
  isUpdating,
  ...opt
}: UseMakeOrUpdateOfferArgs): UseMutationResult<
  OfferResponse,
  Error,
  offerSchemaType
> => {
  return useMutation<OfferResponse, Error, offerSchemaType>({
    mutationFn: isUpdating ? updateOffer : makeOffer,
    ...opt,
  });
};

export const useGetOfferReplies = (offerId: number) => {
  return useQuery({
    queryKey: [API_ROUTES.OFFER_REPLIES, offerId],
    queryFn: () => getOfferReplies(offerId.toString()),
  });
};

export const useReplyOffer = () => {
  return useMutation<any, Error, any>({
    mutationFn: replyOffer,
  });
};

export const useSurchargeRequest = () => {
  return useMutation<any, Error, ISurchargeRequestPayload>({
    mutationFn: surchargeRequest,
  });
};

export const useRejectSurchargeRequest = (id: string) => {
  return useBaseMutation(rejectSurchargeRequest, {
    invalidateQueryKeys: [
      [API_ROUTES.SURCHARGE_REQUEST_LIST, id],
      [API_ROUTES.GET_TASK_BY_ID, id],
    ],
  });
};

export const useSurchargeList = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: [API_ROUTES.SURCHARGE_REQUEST_LIST, id],
    queryFn: () => surchargeList(id),
    enabled,
  });
};
