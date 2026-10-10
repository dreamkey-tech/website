export { normalizeIndianMobile } from "@/lib/phone";

export function getEnquiryPurpose(
  value: unknown,
): "buy" | "rent" | "sell" | "general" {
  return value === "buy" || value === "rent" || value === "sell"
    ? value
    : "general";
}
