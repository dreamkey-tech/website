import axios from "axios";

const API_BASE_URL = "/api-proxy";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // CRITICAL — sends HttpOnly cookies on every request
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatic 401 Interceptor: Auto-logout on expired session
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.startsWith("/login")
      ) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
