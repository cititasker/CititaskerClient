import { maxLengthChar } from "@/constant";
import { z } from "zod";

// Shared common validation logic
export const baseSchema = z.object({
  type: z.string(),
  task_id: z.number(),
  offer_id: z.number().optional(),
  offer_amount: z
    .string()
    .min(1, { message: "Offer amount is required" })
    .refine((value) => Number(value) > 0, {
      message: "Offer amount must be greater than 0",
    }),
  accepted: z.boolean().refine((value) => value, {
    message: "Please confirm you agreed to the terms and condition",
  }),
  description: z
    .string()
    .min(15, "Must contain at least 15 character(s)")
    .refine((value) => value.length <= maxLengthChar, {
      message: `Maximum length of ${maxLengthChar} characters exceeded`,
    })
    .optional(), // Optional for the base case
  reason: z.string().min(1, "please select a reason").optional(), // Optional for base increase price case
});

export type offerSchemaType = z.infer<typeof baseSchema>;
