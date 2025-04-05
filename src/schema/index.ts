import { z } from "zod";

export const profileSchema = z.object({
  profile_image: z.any(),
  first_name: z.string().min(1, { message: "First name is reqired" }),
  last_name: z.string().min(1, { message: "Last name is reqired" }),
  email: z.string().email({ message: "Must be a valid email" }),
  phone_number: z.string().min(1, { message: "Phone number is reqired" }),
  gender: z.string().min(1, { message: "Gender is reqired" }),
  date_of_birth: z.string().min(1, { message: "Date of birth is reqired" }),
});

export type profileSchemaType = z.infer<typeof profileSchema>;

export const accountSchema = z.object({
  profile_image: z.any(),
  full_name: z.string().optional(),
  email: z.string().optional(),
  phone_number: z.string().optional(),
  location: z.string().optional(),
  occupation: z.string().optional(),
});

export type accountSchemaType = z.infer<typeof accountSchema>;

export const securitySchema = z
  .object({
    current_password: z.string().min(1, "Please enter current password"),
    new_password: z.string().min(6, "Must be at least 6 characters"),
    new_password_confirmation: z.string(),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Passwords don't match",
    path: ["new_password_confirmation"],
  });

export type securitySchemaType = z.infer<typeof securitySchema>;

export const disputeSchema = z.object({
  task_status: z.string().min(1, "Please select task status"),
  reason: z.string().min(1, "Please select an option"),
  proposal: z.string().min(1, "Please select an option"),
  refund_amount: z.string().min(1, "Please enter an amount"),
  detail: z.string().min(1, "Field is required"),
  files: z
    .array(
      z
        .any()
        .refine(
          (file: any) => file instanceof File && file.size <= 5 * 1024 * 1024,
          {
            message: "File size must be less than 5MB",
          }
        )
    )
    .optional(),
});

export type disputeSchemaType = z.infer<typeof disputeSchema>;
