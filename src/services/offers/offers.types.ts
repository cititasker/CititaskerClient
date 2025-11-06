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

export interface ISurchargeRequestPayload {
  task_id: string;
  amount: number;
  reason: string;
  description?: string;
}

export interface ISurcharge {
  id: number;
  task_id: number;
  amount: number;
  reason: string;
  status: "pending" | "completed" | "failed" | string;
  payment_status: "unpaid" | "paid" | "refunded" | string;
  created_at: string;
  payable_id?: number;
}

export interface ISurchargeRequestResponse {
  data: ISurcharge[];
}
