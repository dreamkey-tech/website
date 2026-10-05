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
    // We do not want to automatically redirect on 401 because it forces unauthenticated users to the login page
    // when they just visit the homepage or when refreshUser is called.
    return Promise.reject(error);
  }
);
