import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import { OfferResponse, UseMakeOrUpdateOfferArgs } from "./offers.types";
import { offerSchemaType } from "@/schema/offer";
import {
  getOfferReplies,
  makeOffer,
  replyOffer,
  updateOffer,
} from "./offers.api";
import { API_ROUTES } from "@/constant";

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
