"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { authApi } from "@/api/auth";
import { resetPasswordSchema } from "@/zod/auth";
import { useAuthStore } from "@/store/authStore";
import AuthField from "./AuthField";
import { useAuthRequest } from "./useAuthRequest";
import styles from "./Auth.module.css";

export default function ResetPasswordForm({
  email,
  otp,
  onDone,
  onNewCode,
}: {
  email: string;
  otp: string;
  onDone: () => void;
  onNewCode: () => void;
}) {
  const [values, setValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof values, string>>
  >({});
  const form = useRef<HTMLFormElement>(null);
  const request = useAuthRequest();
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (request.pending) return;
    const parsed = resetPasswordSchema.safeParse({ email, otp, ...values });
    if (!parsed.success) {
      const next: typeof errors = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (field === "newPassword" || field === "confirmPassword")
          next[field] = issue.message;
      });
      setErrors(next);
      form.current
        ?.querySelector<HTMLInputElement>(`[name="${Object.keys(next)[0]}"]`)
        ?.focus();
      return;
    }
    setErrors({});
    await request.run(async (signal) => {
      await authApi.resetPassword(
        {
          email: parsed.data.email,
          otp: parsed.data.otp,
          newPassword: parsed.data.newPassword,
        },
        signal,
      );
      if (signal.aborted) return;
      useAuthStore.getState().setUser(null);
      // Clear old session cookies after the backend revokes the sessions.
      await authApi.logout();
      if (signal.aborted) return;
      setValues({ newPassword: "", confirmPassword: "" });
      onDone();
    }, "We couldn’t reset your password. The code may have expired; request a new one and try again.");
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
        noValidate
        className={styles.form}
        aria-busy={request.pending}
      >
        <div className={styles.fields}>
          {(["newPassword", "confirmPassword"] as const).map((name) => (
            <AuthField
              key={name}
              name={name}
              label={
                name === "newPassword" ? "New password" : "Confirm new password"
              }
              type="password"
              value={values[name]}
              onChange={(value) => {
                setValues((previous) => ({ ...previous, [name]: value }));
                setErrors((previous) => ({ ...previous, [name]: undefined }));
                request.clearError();
              }}
              autoComplete="new-password"
              placeholder={
                name === "newPassword"
                  ? "Create a new password"
                  : "Enter it again"
              }
              hint={
                name === "newPassword"
                  ? "Use at least 6 characters."
                  : undefined
              }
              error={errors[name]}
              disabled={request.pending}
            />
          ))}
          <button
            className={styles.inlineButton}
            type="button"
            onClick={onNewCode}
            disabled={request.pending}
          >
            Need a new verification code?
          </button>
        </div>
        <button
          className={styles.submit}
          type="submit"
          disabled={request.pending}
        >
          {request.pending ? "Updating password…" : "Update password"}
          {!request.pending && <ArrowRight size={18} aria-hidden="true" />}
        </button>
      </form>
    </>
  );
}
