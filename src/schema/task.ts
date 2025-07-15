import { z } from "zod";

export const postTaskSchema = z.object({
  name: z
    .string()
    .min(1, "Please enter what task you need done")
    .refine((val) => val.length <= 100, {
      message: "Title cannot be more than 50 characters long",
    }),
  description: z.string().min(1, "Description is required"),
  category_id: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable()
    .refine((value) => value, { message: "Please select an industry" }),
  sub_category_id: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable()
    .refine((value) => value, { message: "Please select a category" }),
  images: z.array(z.any()),
  location_type: z
    .enum(["in_person", "online"], {
      required_error: "Location type is required",
    })
    .nullable()
    .refine((value) => value, { message: "Please select location type" }),
  state: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable()
    .refine((value) => value, { message: "Please select your state" }),
  location: z.array(z.any()).nonempty("Location is required"),
  address: z.string().nullable(),
  time_frame: z
    .enum(["on_date", "before_date", "flexible_date"], {
      required_error: "Date type is required",
    })
    .nullable()
    .refine((value) => value, { message: "Please select" }),
  date: z.string().min(1, "Date is required"),
  showTimeOfDay: z.boolean().optional(),
  time: z
    .enum(["morning", "mid_day", "afternoon", "evening"])
    .optional()
    .nullable(),
  budget: z.string().refine(
    (value) => {
      const numberValue = parseFloat(value);
      return !isNaN(numberValue) && numberValue > 0;
    },
    { message: "Please enter a valid amount greater than 0" }
  ),
});

export type postTaskSchemaType = z.infer<typeof postTaskSchema>;
