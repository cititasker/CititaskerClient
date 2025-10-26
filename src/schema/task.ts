import { z } from "zod";

const MAX_IMAGE_COUNT = 3;
const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // 2MB

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
  images: z
    .array(z.any()) // If you're using File objects, you can also use z.custom<File>()
    .max(MAX_IMAGE_COUNT, `You can upload up to ${MAX_IMAGE_COUNT} images`)
    // .refine(
    //   (files) =>
    //     files.every((file) =>
    //       typeof file === "string" ? true : file.size <= MAX_IMAGE_SIZE
    //     ),
    //   {
    //     message: "Each image must be less than 2MB",
    //   }
    // )
    .optional(),
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
  location: z.union([
    z.tuple([z.number(), z.number()]),
    z.array(z.number()).length(0), // allow empty array
  ]),
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

export const rescheduleTaskSchema = z
  .object({
    dateTime: z.object({
      date: z.string(),
      time: z.string(),
    }),
  })
  .superRefine(({ dateTime }, ctx) => {
    const { date, time } = dateTime;
    if (!date) {
      ctx.addIssue({
        path: ["dateTime"],
        code: z.ZodIssueCode.custom,
        message: "Date is required",
      });
    }
    if (date && !time) {
      ctx.addIssue({
        path: ["dateTime"],
        code: z.ZodIssueCode.custom,
        message: "Time is required",
      });
    }
  });
export type rescheduleTaskSchemaType = z.infer<typeof rescheduleTaskSchema>;
