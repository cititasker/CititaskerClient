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

export interface IReplies {
  content: string;
  created_at: string;
  files: [];
  id: number;
  user_id: number;
}
export interface IOfferReplies {
  created_at: string;
  description: string;
  id: number;
  offer_amount: number;
  status: string;
  replies: IReplies[];
  tasker: {
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    profile_image: string;
  };
}
