import { z } from "zod";

export const surchargeSchema = z.object({
  task_id: z.number(),
  payable_id: z.number(),
  offer_amount: z
    .string()
    .min(1, { message: "Offer amount is required" })
    .refine((value) => Number(value) > 0, {
      message: "Offer amount must be greater than 0",
    }),
  payable: z.number().optional(),
  agreed: z.boolean().refine((value) => value, {
    message: "Please confirm you agreed to the terms and condition",
  }),
});

export type offerSchemaType = z.infer<typeof surchargeSchema>;
