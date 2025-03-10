import { z } from "zod";

export const taskerWaitListFormSchema = z.object({
  name: z.string().min(1, "Please enter your full name"),
  email: z.string().email({ message: "Must be a valid email" }),
  location: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable()
    .refine((value) => value, { message: "Please select your location" }),
  occupation: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable()
    .refine((value) => value, { message: "Please select an industry" }),
});

export type taskerWaitListFormSchemaType = z.infer<
  typeof taskerWaitListFormSchema
>;

export const posterWaitListFormSchema = z.object({
  name: z.string().min(1, "Please enter your full name"),
  email: z.string().email({ message: "Must be a valid email" }),
  location: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable()
    .refine((value) => value, { message: "Please select your location" }),
});

export type posterWaitListFormSchemaType = z.infer<
  typeof posterWaitListFormSchema
>;
