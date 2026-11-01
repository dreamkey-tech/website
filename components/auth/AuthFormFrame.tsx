import type { ReactNode } from "react";
import Link from "next/link";
import { authPageHref } from "@/lib/auth-return";
import styles from "./Auth.module.css";

export default function AuthFormFrame({
  mode,
  children,
  title,
  description,
  returnTo,
  onModeChange,
  headingLevel = 1,
}: {
  mode: "login" | "register" | "recovery";
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  returnTo?: string;
  onModeChange?: (mode: "login" | "register") => void;
  headingLevel?: 1 | 2;
}) {
  const isLogin = mode === "login";
  const Heading = headingLevel === 2 ? "h2" : "h1";
  return (
    <div className={styles.formFrame}>
      <nav className={styles.tabs} aria-label="Account access">
        {onModeChange ? (
          (["login", "register"] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => onModeChange(value)}
            >
              {value === "login" ? "Log in" : "Create account"}
            </button>
          ))
        ) : (
          <>
            <Link
              href={authPageHref("/login", returnTo)}
              aria-current={isLogin ? "page" : undefined}
            >
              Log in
            </Link>
            <Link
              href={authPageHref("/register", returnTo)}
              aria-current={mode === "register" ? "page" : undefined}
            >
              Create account
            </Link>
          </>
        )}
      </nav>
      <div className={styles.formHeading}>
        <Heading id="account-title">
          {title ??
            (isLogin ? (
              <>
                Welcome <em>back.</em>
              </>
            ) : (
              <>
                Make yourself <em>at home.</em>
              </>
            ))}
        </Heading>
        <p>
          {description ??
            (isLogin
              ? "Enter your details to access your account."
              : "Enter your details to create your account.")}
        </p>
      </div>
      {children}
      <p className={styles.switchAccount}>
        {isLogin
          ? "Don’t have an account? "
          : mode === "recovery"
            ? "Remember your password? "
            : "Already have an account? "}
        {onModeChange ? (
          <button
            type="button"
            onClick={() => onModeChange(isLogin ? "register" : "login")}
          >
            {isLogin ? "Create an account" : "Log in"}
          </button>
        ) : (
          <Link href={authPageHref(isLogin ? "/register" : "/login", returnTo)}>
            {isLogin ? "Create an account" : "Log in"}
          </Link>
        )}
      </p>
    </div>
  );
}
