import { apiClient } from "./client";

export const propertiesApi = {
  recordInterest: async (id: string) => {
    const { data } = await apiClient.post(
      `/v1/website/properties/list/${encodeURIComponent(id)}/click`,
    );
    if (!data || data.success !== true)
      throw new Error("Interest could not be recorded");
  },
};
