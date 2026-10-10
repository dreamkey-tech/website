import { isAxiosError } from "axios";
import { apiClient } from "./client";
import type { PropertyEnquiryInput } from "@/zod/enquiry";
import { normalizeIndianMobile } from "@/lib/phone";

export type PropertyEnquiryRequest = Required<PropertyEnquiryInput>;

export interface SubmittedEnquiry
  extends Omit<PropertyEnquiryRequest, "specificRequirements"> {
  id: string;
  specificRequirements: string | null;
  status: "NEW" | "IN_PROGRESS" | "CONTACTED" | "RESOLVED" | "CLOSED";
  createdAt: string;
  updatedAt: string;
}

export interface EnquirySuccessResponse {
  success: true;
  message: string;
  enquiry: SubmittedEnquiry;
}

export interface EnquiryFailureResponse {
  success: false;
  error: string;
  code: string;
}

const FALLBACK_ERROR = "We couldn’t send your enquiry. Please try again.";

class EnquirySubmissionError extends Error {}

function backendErrorMessage(data: unknown) {
  if (typeof data !== "object" || data === null || !("error" in data)) return;
  return typeof data.error === "string" && data.error.trim()
    ? data.error.trim()
    : undefined;
}

export function getEnquiryErrorMessage(error: unknown) {
  if (isAxiosError<EnquiryFailureResponse>(error)) {
    return backendErrorMessage(error.response?.data) ?? FALLBACK_ERROR;
  }
  return error instanceof EnquirySubmissionError
    ? error.message
    : FALLBACK_ERROR;
}

/** Always send the seven documented keys; never pass form-only fields to the API. */
export function enquiryRequest(
  data: PropertyEnquiryInput,
): PropertyEnquiryRequest {
  return {
    fullName: data.fullName.trim(),
    mobileNo: normalizeIndianMobile(data.mobileNo),
    email: data.email.trim(),
    propertyType: data.propertyType.trim(),
    preferredLocation: data.preferredLocation.trim(),
    estimatedBudgetBand: data.estimatedBudgetBand.trim(),
    specificRequirements: data.specificRequirements?.trim() ?? "",
  };
}

export const enquiryApi = {
  submitPropertyEnquiry: async (
    data: PropertyEnquiryInput,
  ): Promise<EnquirySuccessResponse> => {
    const response = await apiClient.post<
      EnquirySuccessResponse | EnquiryFailureResponse
    >("/v1/website/enquiry", enquiryRequest(data));
    if (response.data?.success !== true) {
      throw new EnquirySubmissionError(
        backendErrorMessage(response.data) ?? FALLBACK_ERROR,
      );
    }
    return response.data;
  },
};
