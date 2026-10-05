import { z } from "zod";

export const propertyEnquirySchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  mobileNo: z.string().regex(/^\+?[\d\s-]{10,}$/, "Please enter a valid mobile number (digits only)"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  propertyType: z.string().optional().or(z.literal("")),
  preferredLocation: z.string().optional().or(z.literal("")),
  estimatedBudgetBand: z.string().optional().or(z.literal("")),
  specificRequirements: z.string().optional().or(z.literal("")),
});

export type PropertyEnquiryInput = z.infer<typeof propertyEnquirySchema>;
