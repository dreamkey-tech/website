"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { authApi } from "@/api/auth";
import { apiClient } from "@/api/client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading, logout } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        // Make the API call to check if the user is logged in
        // If the cookie is valid, this will return the user details
        const data = await authApi.me();
        setUser(data.user || data); // Adjust depending on your API response structure
      } catch (error: any) {
        // If 401, the cookie has expired or is invalid
        if (error.response?.status === 401) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [setUser, setLoading, logout]);

  // Set up an Axios interceptor to catch any 401 Unauthorized responses globally
  useEffect(() => {
    const interceptor = apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiClient.interceptors.response.eject(interceptor);
    };
  }, [logout]);

  return <>{children}</>;
}
