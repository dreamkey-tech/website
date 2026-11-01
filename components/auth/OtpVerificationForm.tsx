"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { authApi, type OtpPurpose } from "@/api/auth";
import { otpSchema } from "@/zod/auth";
import { useAuthRequest } from "./useAuthRequest";
import styles from "./Auth.module.css";

const OTP_LIFETIME = 5 * 60 * 1000;
const RESEND_DELAY = 30 * 1000;

export default function OtpVerificationForm({
  email,
  purpose,
  initialMessage,
  onVerify,
  onBack,
}: {
  email: string;
  purpose: OtpPurpose;
  initialMessage?: string;
  onVerify: (otp: string, signal: AbortSignal) => Promise<void>;
  onBack: () => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const request = useAuthRequest();
  const [otp, setOtp] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [resending, setResending] = useState(false);
  const [notice, setNotice] = useState(
    initialMessage || "A 4-digit code has been sent to your email.",
  );
  const [sentAt, setSentAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());
  const remaining = Math.max(
    0,
    Math.ceil((sentAt + OTP_LIFETIME - now) / 1000),
  );
  const cooldown = Math.max(0, Math.ceil((sentAt + RESEND_DELAY - now) / 1000));

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!request.pending) input.current?.focus();
  }, [request.pending]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (request.pending) return;
    const parsed = otpSchema.safeParse({ email, otp });
    if (!parsed.success) {
      setFieldError("Enter the 4-digit code from your email");
      input.current?.focus();
      return;
    }
    setFieldError("");
    setResending(false);
    await request.run(
      (signal) => onVerify(parsed.data.otp, signal),
      "We couldn’t verify the code. Please try again or request a new one.",
    );
  }

  async function resend() {
    if (cooldown > 0 || request.pending) return;
    setResending(true);
    await request.run(async (signal) => {
      const result = await authApi.resendOtp({ email, purpose }, signal);
      if (signal.aborted) return;
      const time = Date.now();
      setNow(time);
      setSentAt(time);
      setOtp("");
      setFieldError("");
      setNotice(
        result?.message ||
          "A new code has been sent. Please use the latest email.",
      );
    }, "We couldn’t send a new code. Please try again.");
  }

  return (
    <>
      <p className={styles.notice} role="status">
        {notice}
      </p>
      {request.error && (
        <p className={styles.apiError} role="alert">
          {request.error}
        </p>
      )}
      <form
        className={styles.form}
        onSubmit={submit}
        noValidate
        aria-busy={request.pending}
      >
        <div className={`${styles.fields} ${styles.challengeFields}`}>
          <p className={styles.deliveryAddress}>
            Sent to <strong>{email}</strong>
          </p>
          <div className={styles.field}>
            <label htmlFor="account-otp">Email verification code</label>
            <input
              ref={input}
              id="account-otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{4}"
              maxLength={4}
              required
              value={otp}
              onChange={(event) => {
                setOtp(event.target.value.replace(/\D/g, "").slice(0, 4));
                setFieldError("");
                request.clearError();
              }}
              aria-invalid={Boolean(fieldError)}
              aria-describedby={`otp-hint${fieldError ? " otp-error" : ""}`}
              disabled={request.pending}
              className={styles.otpInput}
              placeholder="0000"
            />
            <p id="otp-hint" className={styles.hint}>
              {remaining > 0
                ? `Code expires in ${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")}`
                : "This code may have expired. Request a new one below."}
            </p>
            {fieldError && (
              <p id="otp-error" className={styles.fieldError} role="alert">
                {fieldError}
              </p>
            )}
          </div>
          <div className={styles.recoveryActions}>
            <button
              type="button"
              className={styles.inlineButton}
              disabled={request.pending || cooldown > 0}
              onClick={resend}
            >
              {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
            </button>
            <button
              type="button"
              className={styles.inlineButton}
              disabled={request.pending}
              onClick={onBack}
            >
              {purpose === "LOGIN" ? "Back to sign in" : "Use another email"}
            </button>
          </div>
        </div>
        <button
          className={styles.submit}
          type="submit"
          disabled={request.pending}
        >
          {request.pending
            ? resending
              ? "Sending code…"
              : "Verifying…"
            : purpose === "LOGIN"
              ? "Verify and log in"
              : "Verify code"}
          {!request.pending && <ArrowRight size={18} aria-hidden="true" />}
        </button>
        <span className={styles.srOnly} role="status">
          {request.pending ? "Processing your verification request" : ""}
        </span>
      </form>
    </>
  );
}
