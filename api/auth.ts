// api/auth.ts
import { apiClient, clearAuthToken } from "./client";
import type {
  EmailInput,
  LoginInput,
  OtpInput,
  RegisterInput,
  ResetPasswordInput,
} from "@/zod/auth";

export interface WebsiteUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  emailVerified?: boolean;
  authProvider?: string;
}

export type OtpPurpose = "LOGIN" | "PASSWORD_RESET";
export interface AuthMessage {
  success?: boolean;
  message?: string;
}
export interface LoginChallenge extends AuthMessage {
  success: true;
  requiresOtp: true;
  email: string;
}
export interface AuthSession extends AuthMessage {
  user: WebsiteUser;
}

/** Controlled response errors are safe to display; never expose raw request/config errors. */
export class AuthResponseError extends Error {
  constructor(
    message: string,
    public code?: string,
  ) {
    super(message);
  }
}

function object(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}

function message(value: unknown, fallback: string) {
  if (!object(value)) return fallback;
  for (const key of ["message", "error"]) {
    if (typeof value[key] === "string" && value[key].trim())
      return value[key].trim();
  }
  return fallback;
}

async function post<T>(
  path: string,
  payload: object | undefined,
  signal?: AbortSignal,
): Promise<T> {
  const { data } = await apiClient.post<T>(`/v1/user/auth/${path}`, payload, {
    signal,
  });
  // Some message-only endpoints document no body. Accept an empty response,
  // but never mistake an HTML proxy/error page or array for success.
  if ((data != null && data !== "" && !object(data)) || Array.isArray(data)) {
    throw new AuthResponseError(
      "We couldn’t confirm the server response. Please try again.",
    );
  }
  if (object(data) && data.success === false) {
    throw new AuthResponseError(
      message(data, "The request could not be completed. Please try again."),
      typeof data.code === "string" ? data.code : undefined,
    );
  }
  return object(data)
    ? ({
        ...data,
        message: typeof data.message === "string" ? data.message : undefined,
      } as T)
    : data;
}

function session(data: unknown): AuthSession {
  if (
    !object(data) ||
    !object(data.user) ||
    typeof data.user.id !== "string" ||
    typeof data.user.name !== "string" ||
    typeof data.user.email !== "string"
  ) {
    throw new AuthResponseError(
      "We couldn’t confirm your account. Please try signing in again.",
    );
  }
  return data as unknown as AuthSession;
}

export const authApi = {
  // ─── Email / Password ─────────────────────────────────────────────────────

  login: async (
    data: LoginInput,
    signal?: AbortSignal,
  ): Promise<LoginChallenge> => {
    const response = await post<LoginChallenge>(
      "login",
      { email: data.email, password: data.password },
      signal,
    );
    if (
      !response ||
      response.success !== true ||
      response.requiresOtp !== true
    ) {
      throw new AuthResponseError(
        "We couldn’t start email verification. Please try again.",
      );
    }
    return {
      ...response,
      email:
        typeof response.email === "string" && response.email.trim()
          ? response.email.trim()
          : data.email,
    };
  },

  register: async (
    data: RegisterInput & { phone?: string; countryCode?: string },
    signal?: AbortSignal,
  ): Promise<AuthSession> => {
    const payload: Record<string, string> = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    if (data.phone) payload.phone = data.phone;
    if (data.countryCode) payload.countryCode = data.countryCode;
    return session(await post("register", payload, signal));
  },

  verifyLoginOtp: async (
    data: OtpInput,
    signal?: AbortSignal,
  ): Promise<AuthSession> => {
    const response = await post<AuthSession>(
      "verify-login-otp",
      { email: data.email, otp: data.otp },
      signal,
    );
    if (
      !response ||
      response.success !== true ||
      response.user?.emailVerified !== true
    )
      throw new AuthResponseError(
        "We couldn’t verify your email. Please try again.",
      );
    return session(response);
  },

  resendOtp: (
    data: EmailInput & { purpose: OtpPurpose },
    signal?: AbortSignal,
  ) =>
    post<AuthMessage>(
      "resend-otp",
      { email: data.email, purpose: data.purpose },
      signal,
    ),

  forgotPassword: (data: EmailInput, signal?: AbortSignal) =>
    post<AuthMessage>("forgot-password", { email: data.email }, signal),

  verifyResetOtp: (data: OtpInput, signal?: AbortSignal) =>
    post<AuthMessage>(
      "verify-reset-otp",
      { email: data.email, otp: data.otp },
      signal,
    ),

  resetPassword: (
    data: Omit<ResetPasswordInput, "confirmPassword">,
    signal?: AbortSignal,
  ) =>
    post<AuthMessage>(
      "reset-password",
      { email: data.email, otp: data.otp, newPassword: data.newPassword },
      signal,
    ),

  /** End only the provisional website session created by registration. */
  logoutWebsiteSession: async (signal?: AbortSignal) => {
    await post<AuthMessage>("logout", undefined, signal);
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
    try {
      // Call both endpoints — one for email/password session, one for OAuth session
      await apiClient.post("/v1/user/auth/logout").catch(() => {});
      await apiClient.post("/api/auth/sign-out").catch(() => {});
    } finally {
      clearAuthToken();
    }
  },

  // ─── Google OAuth (Better Auth) ───────────────────────────────────────────

  /** Step 1: Get the Google consent URL from the backend */
  googleSignIn: async (
    callbackURL?: string,
    errorCallbackURL?: string,
  ): Promise<string> => {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Use fetch with redirect:'manual' so we capture the Location header
    // when the backend issues a 302 redirect to Google's consent screen,
    // rather than axios silently following it and losing the URL.
    const response = await fetch("/api/auth/sign-in/social", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      redirect: "manual",
      body: JSON.stringify({
        provider: "google",
        callbackURL: callbackURL || `${origin}/auth/callback`,
        errorCallbackURL: errorCallbackURL || `${origin}/login`,
      }),
    });

    // 302 redirect → Location header contains the Google consent URL
    if (
      response.type === "opaqueredirect" ||
      (response.status >= 300 && response.status < 400)
    ) {
      const location = response.headers.get("Location");
      if (location) return location;
    }

    // 200 JSON response with { url } field
    if (response.ok) {
      const data = await response.json().catch(() => null);
      if (data && typeof data.url === "string" && data.url) return data.url;
    }

    throw new AuthResponseError("No sign-in URL returned from server.");
  },

  /** Get session for OAuth users (Better Auth) */
  getSession: async () => {
    const response = await apiClient.get("/api/auth/get-session");
    return response.data; // { user, session } or null
  },

  /** Save or update phone number for the authenticated user (email-auth or OAuth). */
  updatePhone: async (
    phone: string,
    countryCode: string,
    signal?: AbortSignal,
  ): Promise<{ user: WebsiteUser }> => {
    // Try the v1 user-auth path first; fall back to the Better Auth phone path.
    try {
      const { data } = await apiClient.post(
        "/v1/user/auth/phone",
        { phone, countryCode },
        { signal },
      );
      if (object(data) && data.success === false) {
        throw new AuthResponseError(
          message(data, "We couldn't save your phone number. Please try again."),
        );
      }
      return data as { user: WebsiteUser };
    } catch (err) {
      if ((err as AuthResponseError).name === "AuthResponseError") throw err;
      // Fallback to Better Auth phone endpoint
      const { data } = await apiClient.post(
        "/api/auth/phone",
        { phone, countryCode },
        { signal },
      );
      if (object(data) && data.success === false) {
        throw new AuthResponseError(
          message(data, "We couldn't save your phone number. Please try again."),
        );
      }
      return data as { user: WebsiteUser };
    }
  },
};