import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

const password = z.string().min(6, "Password must be at least 6 characters");

export const loginSchema = emailSchema.extend({ password });

export const registerSchema = loginSchema.extend({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  countryCode: z.string().optional(),
});

export const otpSchema = emailSchema.extend({
  otp: z.string().regex(/^\d{4}$/, "Enter the 4-digit code from your email"),
});

export const resetPasswordSchema = otpSchema
  .extend({
    newPassword: password,
    confirmPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don’t match",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type EmailInput = z.infer<typeof emailSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
