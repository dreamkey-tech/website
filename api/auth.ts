import { apiClient } from "./client";
import { LoginInput, RegisterInput } from "../zod/auth";

export const authApi = {
  // ─── Email / Password ─────────────────────────────────────────────────────

  login: async (data: LoginInput) => {
    const response = await apiClient.post("/v1/user/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterInput) => {
    const response = await apiClient.post("/v1/user/auth/register", data);
    return response.data;
  },

  me: async () => {
    const response = await apiClient.get("/v1/user/auth/me");
    return response.data;
  },

  refreshToken: async () => {
    const response = await apiClient.post("/v1/user/auth/refresh");
    return response.data;
  },

  logout: async () => {
    // Call both endpoints — one for email/password session, one for OAuth session
    await apiClient.post("/v1/user/auth/logout").catch(() => {});
    await apiClient.post("/api/auth/sign-out").catch(() => {});
  },

  // ─── Google OAuth (Better Auth) ───────────────────────────────────────────

  /** Step 1: Get the Google consent URL from the backend */
  googleSignIn: async (callbackURL?: string): Promise<string> => {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const response = await apiClient.post("/api/auth/sign-in/social", {
      provider: "google",
      callbackURL: callbackURL || `${origin}/`,
      errorCallbackURL: `${origin}/login`,
    });

    return response.data.url as string;
  },

  /** Get session for OAuth users (Better Auth) */
  getSession: async () => {
    const response = await apiClient.get("/api/auth/get-session");
    return response.data; // { user, session } or null
  },
};
