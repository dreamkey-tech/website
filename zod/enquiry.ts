import { z } from "zod";

export const propertyEnquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must contain at least 2 characters"),
  mobileNo: z
    .string()
    .regex(/^\+91 \d{10}$/, "Mobile number must be exactly 10 digits"),
  email: z.string().trim().email("Enter a valid email address"),
  propertyType: z.string().trim().min(1, "Choose a property type"),
  preferredLocation: z.string().trim().min(1, "Enter the property location"),
  estimatedBudgetBand: z
    .string()
    .trim()
    .min(1, "Enter your budget or expected price"),
  specificRequirements: z.string().trim().optional(),
});

export type PropertyEnquiryInput = z.infer<typeof propertyEnquirySchema>;
