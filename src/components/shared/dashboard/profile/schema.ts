import { z } from "zod";

// Helper function to check for non-empty text content
const hasTextContent = (value: string): boolean => {
  const div = document.createElement("div");
  div.innerHTML = value;
  const text = div.textContent?.trim();
  return !!text && text.length > 0;
};

export const schema = z.object({
  bio: z.string().refine((val) => hasTextContent(val), {
    message: "Please enter some text",
  }),
  skills: z.array(
    z.object({
      name: z.string().min(1, "Skill cannot be empty"),
    })
  ),
  // .min(1, { message: "Add at least one skill" }),
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
