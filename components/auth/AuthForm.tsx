"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react";
import { toast } from "sonner";
import { authApi, type LoginChallenge, type WebsiteUser } from "@/api/auth";
import { loginSchema, registerSchema, type RegisterInput } from "@/zod/auth";
import { useAuthStore } from "@/store/authStore";
import { safeAuthReturnTo, authPageHref } from "@/lib/auth-return";
import AuthFormFrame from "./AuthFormFrame";
import CredentialFields, { type CredentialErrors } from "./CredentialFields";
import OtpVerificationForm from "./OtpVerificationForm";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { useAuthRequest } from "./useAuthRequest";
import styles from "./Auth.module.css";

export default function AuthForm({
  mode,
  returnTo,
  onAuthenticated,
  onModeChange,
}: {
  mode: "login" | "register";
  returnTo?: string;
  onAuthenticated?: () => void;
  onModeChange?: (mode: "login" | "register") => void;
}) {
  const isLogin = mode === "login";
  const router = useRouter();
  const { setUser } = useAuthStore();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<RegisterInput>({
    name: "",
    email: "",
    password: "",
    phone: "",
    countryCode: "+91",
  });
  const [errors, setErrors] = useState<CredentialErrors>({});
  const [challenge, setChallenge] = useState<LoginChallenge | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const request = useAuthRequest();
  const busy = request.pending || isGoogleLoading;

  function changeField(name: keyof RegisterInput, value: string) {
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    request.clearError();
  }

  function signedIn(user: WebsiteUser) {
    setUser(user);
    toast.success(
      isLogin ? "Successfully logged in!" : "Account created successfully!",
    );
    if (onAuthenticated) {
      onAuthenticated();
      return;
    }
    router.push(safeAuthReturnTo(returnTo));
    router.refresh();
  }

  async function sendSignupCode(email: string, signal: AbortSignal) {
    // Registration currently issues cookies before verification. End that
    // provisional session so only a verified OTP completes website sign-in.
    await authApi.logoutWebsiteSession(signal);
    const result = await authApi.resendOtp({ email, purpose: "LOGIN" }, signal);
    if (signal.aborted) return;
    setChallenge({
      success: true,
      requiresOtp: true,
      email,
      message:
        result?.message ??
        "Your account is created. Check your email for a verification code.",
    });
  }

  /**
   * After registration the backend already dispatched the OTP — calling
   * resendOtp immediately would hit the 60-second rate limit and prevent the
   * OTP view from ever appearing. This function clears the provisional session
   * cookie and sets the challenge state directly so the user lands on the code
   * input right away. The OTP form's built-in Resend button handles later
   * re-sends after the cooldown elapses.
   */
  async function goToOtpAfterRegister(email: string, signal: AbortSignal) {
    // Best-effort logout — a failed logout should not block the user
    // from reaching the verification step.
    await authApi.logoutWebsiteSession(signal).catch(() => {});
    if (signal.aborted) return;
    setChallenge({
      success: true,
      requiresOtp: true,
      email,
      message:
        "A 4-digit verification code has been sent to your email. Enter it below to complete registration.",
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const parsed = (isLogin ? loginSchema : registerSchema).safeParse(values);
    if (!parsed.success) {
      const next: CredentialErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof RegisterInput;
        if (field in values && !next[field]) next[field] = issue.message;
      }
      setErrors(next);
      const first = (["name", "email", "password"] as const).find(
        (field) => next[field],
      );
      formRef.current
        ?.querySelector<HTMLInputElement>(`[name="${first}"]`)
        ?.focus();
      return;
    }
    setErrors({});
    await request.run(
      async (signal) => {
        if (isLogin) {
          const result = await authApi.login(
            { email: parsed.data.email, password: parsed.data.password },
            signal,
          );
          if (signal.aborted) return;
          setValues((previous) => ({ ...previous, password: "" }));
          setChallenge(result);
        } else {
          const result = await authApi.register(
            {
              name: values.name.trim(),
              email: parsed.data.email,
              password: parsed.data.password,
              phone: values.phone?.trim() || undefined,
              countryCode: values.phone?.trim() ? (values.countryCode || "+91") : undefined,
            },
            signal,
          );
          if (signal.aborted) return;
          setValues((previous) => ({ ...previous, password: "" }));
          await goToOtpAfterRegister(result.user.email, signal);
        }
      },
      isLogin
        ? "We couldn’t start sign-in. Check your details and try again."
        : "We couldn’t complete signup. Please try again.",
    );
  }

  if (challenge)
    return (
      <AuthFormFrame
        mode={mode}
        returnTo={returnTo}
        onModeChange={onModeChange}
        headingLevel={onAuthenticated ? 2 : 1}
        title={
          <>
            Check your <em>inbox.</em>
          </>
        }
        description="Enter the 4-digit code to verify your email and finish signing in."
      >
        <OtpVerificationForm
          email={challenge.email}
          purpose="LOGIN"
          initialMessage={challenge.message}
          onVerify={async (otp, signal) => {
            const result = await authApi.verifyLoginOtp(
              { email: challenge.email, otp },
              signal,
            );
            if (!signal.aborted) signedIn(result.user);
          }}
          onBack={() => {
            if (!isLogin) {
              if (onModeChange) {
                onModeChange("login");
                return;
              }
              router.replace(authPageHref("/login", returnTo));
              return;
            }
            setChallenge(null);
            request.clearError();
          }}
        />
      </AuthFormFrame>
    );

  return (
    <AuthFormFrame
      mode={mode}
      returnTo={returnTo}
      onModeChange={onModeChange}
      headingLevel={onAuthenticated ? 2 : 1}
    >
      {request.error && (
        <p className={styles.apiError} role="alert">
          {request.error}
        </p>
      )}
      <form
        ref={formRef}
        onSubmit={submit}
        noValidate
        aria-busy={busy}
        className={styles.form}
      >
        <CredentialFields
          mode={mode}
          values={values}
          errors={errors}
          busy={busy}
          returnTo={returnTo}
          onChange={changeField}
        />
        <button className={styles.submit} type="submit" disabled={busy}>
          <span>
            {request.pending
              ? isLogin
                ? "Sending code…"
                : "Creating account…"
              : isLogin
                ? "Log in"
                : "Create account"}
          </span>
          {!request.pending && <ArrowRight size="1.125rem" aria-hidden="true" />}
        </button>
        <span className={styles.srOnly} role="status">
          {request.pending ? "Processing your account request" : ""}
        </span>
      </form>
      <div className={styles.divider}>
        <span>or continue with</span>
      </div>
      <GoogleSignInButton
        returnTo={returnTo}
        disabled={request.pending}
        onBusyChange={setIsGoogleLoading}
      />
    </AuthFormFrame>
  );
}
