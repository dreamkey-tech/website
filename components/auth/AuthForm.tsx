"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react";
import { toast } from "sonner";
import { authApi } from "@/api/auth";
import { loginSchema, registerSchema } from "@/zod/auth";
import { useAuthStore } from "@/store/authStore";
import AuthField from "./AuthField";
import AuthFormFrame from "./AuthFormFrame";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { authErrorDetails } from "./auth-errors";
import styles from "./Auth.module.css";

type Fields = { name: string; email: string; password: string };
type FieldErrors = Partial<Record<keyof Fields, string>>;

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const isLogin = mode === "login";
  const router = useRouter();
  const { refreshUser } = useAuthStore();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Fields>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const busy = isLoading || isGoogleLoading;

  function changeField(name: keyof Fields, value: string) {
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    setApiError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setErrors({});
    setApiError(null);
    const result = (isLogin ? loginSchema : registerSchema).safeParse(values);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof Fields;
        if (field in values && !fieldErrors[field])
          fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      const firstField = (["name", "email", "password"] as const).find(
        (field) => fieldErrors[field],
      );
      formRef.current
        ?.querySelector<HTMLInputElement>(`[name="${firstField}"]`)
        ?.focus();
      return;
    }
    setIsLoading(true);
    try {
      if (isLogin) {
        await authApi.login({
          email: result.data.email,
          password: result.data.password,
        });
      } else {
        // The registration schema has validated the name along with the shared fields.
        await authApi.register({
          name: values.name,
          email: result.data.email,
          password: result.data.password,
        });
      }
      await refreshUser();
      toast.success(
        isLogin ? "Successfully logged in!" : "Account created successfully!",
      );
      router.push("/buy");
      router.refresh();
    } catch (error: unknown) {
      const details = authErrorDetails(
        error,
        isLogin
          ? "Invalid email or password"
          : "Failed to create account. Please try again.",
      );
      setApiError(
        details.code === "USE_GOOGLE_LOGIN"
          ? 'This account was created with Google. Please click "Continue with Google" below.'
          : details.message,
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthFormFrame mode={mode}>
      {apiError && (
        <p className={styles.apiError} role="alert">
          {apiError}
        </p>
      )}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        aria-busy={busy}
        className={styles.form}
      >
        {!isLogin && (
          <AuthField
            name="name"
            label="Full name"
            value={values.name}
            onChange={(value) => changeField("name", value)}
            autoComplete="name"
            placeholder="Your full name"
            error={errors.name}
            disabled={busy}
          />
        )}
        <AuthField
          name="email"
          label="Email address"
          type="email"
          value={values.email}
          onChange={(value) => changeField("email", value)}
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email}
          disabled={busy}
        />
        <AuthField
          name="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={(value) => changeField("password", value)}
          autoComplete={isLogin ? "current-password" : "new-password"}
          placeholder={isLogin ? "Enter your password" : "Create a password"}
          hint={!isLogin ? "Use at least 6 characters." : undefined}
          error={errors.password}
          disabled={busy}
        />
        {Object.keys(errors).some((key) => !!errors[key as keyof Fields]) && (
          <p className={styles.srOnly} role="alert">
            Please check the highlighted fields.
          </p>
        )}
        {isLogin && (
          <Link className={styles.helpLink} href="/contact">
            Need help signing in?
          </Link>
        )}
        <button className={styles.submit} type="submit" disabled={busy}>
          <span>
            {isLoading
              ? isLogin
                ? "Logging in…"
                : "Creating account…"
              : isLogin
                ? "Log in"
                : "Create account"}
          </span>
          {!isLoading && <ArrowRight size={18} aria-hidden="true" />}
        </button>
      </form>
      <div className={styles.divider}>
        <span>or continue with</span>
      </div>
      <GoogleSignInButton
        disabled={isLoading}
        onBusyChange={setIsGoogleLoading}
      />
    </AuthFormFrame>
  );
}
