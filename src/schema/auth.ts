import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Please enter your email"),
  password: z.string().min(1, { message: "Please enter your password" }),
  role: z.string().optional(),
});

export type loginSchemaType = z.infer<typeof loginSchema>;

export const verifyEmailSchema = z.object({
  token: z.string().min(4, "Please enter your otp"),
});

export type verifyEmailSchemaType = z.infer<typeof verifyEmailSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Please enter your email address"),
});

export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

export const passwordResetSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    password_confirmation: z
      .string()
      .min(8, "Please confirm your new password"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });
export type passwordResetSchemaType = z.infer<typeof passwordResetSchema>;

export const createAccountSchema = z.object({
  role: z.string().nonempty("Please select one"),
});

export type createAccountSchemaType = z.infer<typeof createAccountSchema>;

export const verifyPhoneSchema = z.object({
  phone_number: z.string().min(11, "Please enter phone number"),
});

export type verifyPhoneSchemaType = z.infer<typeof verifyPhoneSchema>;

export const signUpSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  date_of_birth: z.string().min(1, "Please select date of birth"),
  gender: z.string().min(1, "Please select your gender"),
});

export type signupSchemaType = z.infer<typeof signUpSchema>;
