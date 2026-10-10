/** Accept local/+91 input and serialize the enquiry API's 10-digit format. */
export function normalizeIndianMobile(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits ? `+91 ${digits}` : "";
}
