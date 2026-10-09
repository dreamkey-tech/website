/** Accept the common local and +91 phone formats, then match the existing API. */
export function normalizeIndianMobile(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  return `+91 ${digits}`;
}

export function getEnquiryPurpose(
  value: unknown,
): "buy" | "rent" | "sell" | "general" {
  return value === "buy" || value === "rent" || value === "sell"
    ? value
    : "general";
}
