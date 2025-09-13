import { z } from "zod";

// Zod schema for full validation
export const schema = z.object({
  bio: z.string().min(1, { message: "Please enter some text" }),
  skills: z
    .array(
      z.object({
        name: z.string().min(1, "Skill cannot be empty"),
      })
    )
    .min(1, { message: "Add at least one skill" }),
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
