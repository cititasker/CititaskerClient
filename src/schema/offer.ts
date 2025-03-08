import { maxLengthChar } from "@/constant";
import { z } from "zod";

export const offerSchema = z.object({
  task_id: z.number(),
  offer_id: z.number().optional(),
  offer_amount: z
    .string()
    .min(1, { message: "Offer amount is required" })
    .refine((value) => Number(value) > 0, {
      message: "Offer amount must be greater than 0",
    }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .refine((value) => value.length < maxLengthChar, {
      message: `Maximum length of ${maxLengthChar} characters exceeded`,
    }),
  accepted: z.boolean().refine((value) => value, {
    message: "Please confirm you agreed to the terms and condition",
  }),
});

export type offerSchemaType = z.infer<typeof offerSchema>;
