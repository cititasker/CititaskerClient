import { z } from "zod";

export const schema = z.object({
  bio: z.string().min(1, { message: "Please enter some text" }),
  skills: z
    .array(
      z.object({
        name: z.string().min(1, "Skill cannot be empty"),
      })
    )
    .optional(),
  certificates: z
    .array(
      z.object({
        institution: z.string().min(1, "Institution is required"),
        year: z.string().min(1, "Year is required"),
      })
    )
    .optional(),
});

export type FormSchema = z.infer<typeof schema>;
