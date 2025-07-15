// schemas.ts
import { z } from "zod";

export const bankVerificationSchema = z.object({
  bank: z
    .object({
      name: z.string(),
      bank_code: z.string(),
    })
    .nullable()
    .refine((val) => !!val, {
      message: "Please select a bank",
    }),
  account_number: z.string().min(10, "Please enter a valid account number"),
  name: z.string().min(1, "Could not resolve account name"),
});

export type BankVerificationSchema = z.infer<typeof bankVerificationSchema>;
