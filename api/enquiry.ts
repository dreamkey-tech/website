import { apiClient } from "./client";
import { PropertyEnquiryInput } from "../zod/enquiry";

export const enquiryApi = {
  submitPropertyEnquiry: async (data: PropertyEnquiryInput) => {
    const response = await apiClient.post("/v1/website/enquiry", data);
    return response.data;
  },
};
