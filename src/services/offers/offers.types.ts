import { offerSchemaType } from "@/schema/offer";
import { UseMutationOptions } from "@tanstack/react-query";

export type OfferResponse = {
  message: string;
  success: boolean;
};
export interface UseMakeOrUpdateOfferArgs
  extends Partial<UseMutationOptions<OfferResponse, Error, offerSchemaType>> {
  isUpdating: boolean;
}

export interface IOfferReplies {
  created_at: string;
  description: string;
  id: number;
  offer_amount: number;
  status: string;
  replies: CommentThreadT[];
  tasker: TaskerProfileT;
}
