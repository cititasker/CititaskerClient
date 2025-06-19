import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { OfferResponse, UseMakeOrUpdateOfferArgs } from "./offers.types";
import { offerSchemaType } from "@/schema/offer";
import { makeOffer, updateOffer } from "./offers.api";

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
