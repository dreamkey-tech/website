import { apiClient } from "./client";
import { LoginInput, RegisterInput } from "../zod/auth";

export const authApi = {
  login: async (data: LoginInput) => {
    const response = await apiClient.post("/v1/user/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterInput) => {
    const response = await apiClient.post("/v1/user/auth/register", data);
    return response.data;
  },

  refreshToken: async () => {
    const response = await apiClient.post("/v1/user/auth/refresh");
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/v1/user/auth/logout");
    return response.data;
  },

  me: async () => {
    const response = await apiClient.get("/v1/user/auth/me");
    return response.data;
  },
};
