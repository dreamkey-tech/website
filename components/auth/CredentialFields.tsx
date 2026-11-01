import Link from "next/link";
import { authPageHref } from "@/lib/auth-return";
import type { RegisterInput } from "@/zod/auth";
import AuthField from "./AuthField";
import styles from "./Auth.module.css";

export type CredentialErrors = Partial<Record<keyof RegisterInput, string>>;

export default function CredentialFields({
  mode,
  values,
  errors,
  busy,
  onChange,
  returnTo,
}: {
  mode: "login" | "register";
  values: RegisterInput;
  errors: CredentialErrors;
  busy: boolean;
  onChange: (name: keyof RegisterInput, value: string) => void;
  returnTo?: string;
}) {
  const login = mode === "login";
  return (
    <div className={styles.fields}>
      {!login && (
        <AuthField
          name="name"
          label="Full name"
          value={values.name}
          onChange={(value) => onChange("name", value)}
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
        onChange={(value) => onChange("email", value)}
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
        onChange={(value) => onChange("password", value)}
        autoComplete={login ? "current-password" : "new-password"}
        placeholder={login ? "Enter your password" : "Create a password"}
        hint={!login ? "Use at least 6 characters." : undefined}
        error={errors.password}
        disabled={busy}
      />
      {Object.values(errors).some(Boolean) && (
        <p className={styles.srOnly} role="alert">
          Please check the highlighted fields.
        </p>
      )}
      {login && (
        <Link
          className={styles.helpLink}
          href={authPageHref("/forgot-password", returnTo)}
        >
          Forgot password?
        </Link>
      )}
    </div>
  );
}
