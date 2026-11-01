"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { authApi } from "@/api/auth";
import { emailSchema } from "@/zod/auth";
import AuthField from "./AuthField";
import { useAuthRequest } from "./useAuthRequest";
import styles from "./Auth.module.css";

export default function RecoveryEmailForm({
  initialEmail,
  onSent,
}: {
  initialEmail: string;
  onSent: (email: string, message?: string) => void;
}) {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState<string>();
  const form = useRef<HTMLFormElement>(null);
  const request = useAuthRequest();
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (request.pending) return;
    const parsed = emailSchema.safeParse({ email });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      form.current?.querySelector("input")?.focus();
      return;
    }
    setError(undefined);
    await request.run(async (signal) => {
      const result = await authApi.forgotPassword(parsed.data, signal);
      if (!signal.aborted) onSent(parsed.data.email, result?.message);
    }, "We couldn’t send a reset code. Please try again.");
  }
  return (
    <>
      {request.error && (
        <p className={styles.apiError} role="alert">
          {request.error}
        </p>
      )}
      <form
        ref={form}
        onSubmit={submit}
        className={styles.form}
        noValidate
        aria-busy={request.pending}
      >
        <div className={styles.fields}>
          <AuthField
            name="email"
            type="email"
            label="Email address"
            value={email}
            onChange={(value) => {
              setEmail(value);
              setError(undefined);
              request.clearError();
            }}
            autoComplete="email"
            placeholder="you@example.com"
            disabled={request.pending}
            error={error}
          />
          <p className={styles.hint}>
            We’ll send a 4-digit code to your account email. It is valid for
            five minutes.
          </p>
        </div>
        <button
          type="submit"
          className={styles.submit}
          disabled={request.pending}
        >
          {request.pending ? "Sending reset code…" : "Send reset code"}
          {!request.pending && <ArrowRight size={18} aria-hidden="true" />}
        </button>
      </form>
    </>
  );
}
