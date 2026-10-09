import { isAxiosError } from "axios";

export function authErrorDetails(error: unknown, fallback: string) {
  if (isAxiosError<{ message?: unknown; code?: unknown }>(error)) {
    const data = error.response?.data;
    return {
      message: typeof data?.message === "string" ? data.message : fallback,
      code: typeof data?.code === "string" ? data.code : undefined,
    };
  }
  return { message: fallback, code: undefined };
}
