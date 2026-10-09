import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./Auth.module.css";

export default function AuthFormFrame({
  mode,
  children,
}: {
  mode: "login" | "register";
  children: ReactNode;
}) {
  const isLogin = mode === "login";
  return (
    <div className={styles.formFrame}>
      <nav className={styles.tabs} aria-label="Account access">
        <Link href="/login" aria-current={isLogin ? "page" : undefined}>
          Log in
        </Link>
        <Link href="/register" aria-current={!isLogin ? "page" : undefined}>
          Create account
        </Link>
      </nav>
      <div className={styles.formHeading}>
        <h1 id="account-title">
          {isLogin ? (
            <>
              Welcome <em>back.</em>
            </>
          ) : (
            <>
              Make yourself <em>at home.</em>
            </>
          )}
        </h1>
        <p>
          {isLogin
            ? "Enter your details to access your account."
            : "Enter your details to create your account."}
        </p>
      </div>
      {children}
      <p className={styles.switchAccount}>
        {isLogin ? "Don’t have an account? " : "Already have an account? "}
        <Link href={isLogin ? "/register" : "/login"}>
          {isLogin ? "Create an account" : "Log in"}
        </Link>
      </p>
    </div>
  );
}
