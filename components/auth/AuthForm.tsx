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
  });
  const [errors, setErrors] = useState<CredentialErrors>({});
  const [challenge, setChallenge] = useState<LoginChallenge | null>(null);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
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
            },
            signal,
          );
          if (signal.aborted) return;
          setValues((previous) => ({ ...previous, password: "" }));
          setRegisteredEmail(result.user.email);
          await sendSignupCode(result.user.email, signal);
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

  if (registeredEmail)
    return (
      <AuthFormFrame
        mode={mode}
        returnTo={returnTo}
        onModeChange={onModeChange}
        headingLevel={onAuthenticated ? 2 : 1}
        title={
          <>
            Verify your <em>email.</em>
          </>
        }
        description="Your account has been created. Verify your email to finish signing in."
      >
        <div className={styles.challengeFields} aria-busy={request.pending}>
          <p className={styles.notice}>
            Request a verification code for{" "}
            <strong className={styles.deliveryAddress}>
              {registeredEmail}
            </strong>
            . You won’t need to register again.
          </p>
          {request.error && (
            <p className={styles.apiError} role="alert">
              {request.error}
            </p>
          )}
          <button
            type="button"
            className={styles.submit}
            disabled={request.pending}
            onClick={() =>
              request.run(
                (signal) => sendSignupCode(registeredEmail, signal),
                "We couldn’t send your verification code. Please try again.",
              )
            }
          >
            {request.pending ? "Sending code…" : "Send verification code"}
          </button>
        </div>
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
