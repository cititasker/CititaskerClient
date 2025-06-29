import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { OfferResponse, UseMakeOrUpdateOfferArgs } from "./offers.types";
import { offerSchemaType } from "@/schema/offer";
import { getOfferReplies, makeOffer, updateOffer } from "./offers.api";
import { API_ROUTES } from "@/constant";

interface OfferReplyData {
  //
}

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

export const useGetOfferReplies = (
  data: { id: string },
  options?: UseQueryOptions<OfferReplyData, any>
) => {
  return useQuery<OfferReplyData, any>({
    queryKey: [API_ROUTES.OFFER_REPLIES, data.id],
    queryFn: () => getOfferReplies(data.id),
    ...options,
  });
};
