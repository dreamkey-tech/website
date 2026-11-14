// api/client.ts
import axios from "axios";

const API_BASE_URL = "/api-proxy";
const AUTH_TOKEN_KEY = "ba_session_token";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  ensureSessionCookies(token);
}

export function clearAuthToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  document.cookie = "better-auth.session_token=; path=/; max-age=0; SameSite=Lax";
  document.cookie = "access_token=; path=/; max-age=0; SameSite=Lax";
}

export function ensureSessionCookies(explicitToken?: string): void {
  if (typeof window === "undefined") return;
  const token = explicitToken || getAuthToken();
  if (!token) return;
  const isSecure = window.location.protocol === "https:";
  const flags = `; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax${isSecure ? "; Secure" : ""}`;
  const encoded = encodeURIComponent(token);
  if (!document.cookie.includes("better-auth.session_token=")) {
    document.cookie = `better-auth.session_token=${encoded}${flags}`;
  }
  if (!document.cookie.includes("access_token=")) {
    document.cookie = `access_token=${encoded}${flags}`;
  }
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // CRITICAL — sends HttpOnly cookies on every request
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Better Auth Bearer token (from Google OAuth) if stored
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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