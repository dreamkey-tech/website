"use client";

import { useEffect, useRef, useState } from "react";
import { authErrorDetails } from "./auth-errors";

/** One request at a time; abort on unmount and ignore obsolete completions. */
export function useAuthRequest() {
  const active = useRef<AbortController | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => () => active.current?.abort(), []);

  async function run(
    action: (signal: AbortSignal) => Promise<void>,
    fallback: string,
  ) {
    if (active.current) return;
    const controller = new AbortController();
    active.current = controller;
    setPending(true);
    setError(null);
    try {
      await action(controller.signal);
    } catch (failure) {
      if (!controller.signal.aborted) {
        const details = authErrorDetails(failure, fallback);
        setError(
          details.code === "USE_GOOGLE_LOGIN"
            ? 'This account uses Google. Choose "Continue with Google" on the login page.'
            : details.message,
        );
      }
    } finally {
      if (active.current === controller) {
        active.current = null;
        if (!controller.signal.aborted) setPending(false);
      }
    }
  }

  return { pending, error, clearError: () => setError(null), run };
}
