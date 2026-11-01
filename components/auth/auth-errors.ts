import { isAxiosError } from "axios";
import { AuthResponseError } from "@/api/auth";

export function authErrorDetails(error: unknown, fallback: string) {
  if (error instanceof AuthResponseError)
    return { message: error.message, code: error.code };
  if (
    isAxiosError<{ message?: unknown; error?: unknown; code?: unknown }>(error)
  ) {
    const data = error.response?.data;
    const message =
      typeof data?.message === "string"
        ? data.message.trim()
        : typeof data?.error === "string"
          ? data.error.trim()
          : "";
    return {
      message:
        message ||
        (error.response?.status === 429
          ? "Too many attempts. Please wait before trying again."
          : fallback),
      code: typeof data?.code === "string" ? data.code : undefined,
    };
  }
  return { message: fallback, code: undefined };
}
