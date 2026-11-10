import { useState } from "react";
import Link from "next/link";
import { authPageHref } from "@/lib/auth-return";
import type { RegisterInput } from "@/zod/auth";
import AuthField from "./AuthField";
import styles from "./Auth.module.css";

export type CredentialErrors = Partial<Record<keyof RegisterInput, string>>;

const COUNTRY_CODES = [
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+65", label: "🇸🇬 +65" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+966", label: "🇸🇦 +966" },
  { code: "+880", label: "🇧🇩 +880" },
  { code: "+977", label: "🇳🇵 +977" },
];

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
  const [countryCode, setCountryCode] = useState(
    values.countryCode || "+91",
  );

  function handleCountryCodeChange(code: string) {
    setCountryCode(code);
    onChange("countryCode", code);
  }

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
      {!login && (
        <div className={styles.field}>
          <label htmlFor="account-phone">
            Mobile number{" "}
            <span className={styles.fieldOptional}>(Optional)</span>
          </label>
          <div className={styles.phoneGroup}>
            <select
              id="account-phone-code"
              value={countryCode}
              onChange={(e) => handleCountryCodeChange(e.target.value)}
              disabled={busy}
              aria-label="Country code"
              className={styles.countryCodeSelect}
            >
              {COUNTRY_CODES.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>
            <input
              id="account-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="98765 43210"
              value={values.phone ?? ""}
              onChange={(e) =>
                onChange("phone", e.target.value.replace(/[^\d\s\-]/g, ""))
              }
              disabled={busy}
              aria-describedby="phone-hint"
              className={styles.phoneInput}
            />
          </div>
          <p id="phone-hint" className={styles.hint}>
            Used to share timely property availability and site visit alerts.
          </p>
        </div>
      )}
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
