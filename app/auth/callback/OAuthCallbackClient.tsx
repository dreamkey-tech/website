// app/auth/callback/OAuthCallbackClient.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { setAuthToken } from "@/api/client";
import { safeAuthReturnTo } from "@/lib/auth-return";
import { useAuthStore } from "@/store/authStore";
import styles from "./OAuthCallback.module.css";

type Phase = "connecting" | "success" | "error";

export default function OAuthCallbackClient() {
  const params = useSearchParams();
  const router = useRouter();
  const { refreshUser } = useAuthStore();
  const [phase, setPhase] = useState<Phase>("connecting");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    // Guard against React Strict Mode double-invoke
    if (ran.current) return;
    ran.current = true;

    async function finish() {
      try {
        const token = params.get("token");
        const error = params.get("error");

        if (error) {
          setPhase("error");
          setErrorMsg(
            error === "access_denied"
              ? "Access was denied. You may have cancelled the sign-in."
              : "Google sign-in failed. Please try again.",
          );
          return;
        }

        // Store the token for the axios request interceptor (Bearer header)
        if (token) {
          setAuthToken(token);
        }

        // Re-hydrate the auth store using the new session
        await refreshUser();

        const { user } = useAuthStore.getState();
        if (!user) throw new Error("no_session");

        setPhase("success");

        // Sanitize the destination path and redirect after a brief 250ms checkmark flash
        const returnTo = safeAuthReturnTo(params.get("returnTo") ?? "/buy");
        setTimeout(() => {
          router.replace(returnTo);
        }, 250);
      } catch {
        setPhase("error");
        setErrorMsg("We couldn't complete your sign-in. Please try again.");
      }
    }

    finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.panel} aria-live="polite" aria-atomic="true">
      {phase === "connecting" && (
        <>
          <div className={styles.spinner} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <h1 id="account-title" className={styles.heading}>
            Signing you <em>in.</em>
          </h1>
          <p className={styles.sub}>
            Connecting your Google account — just a moment.
          </p>
        </>
      )}

      {phase === "success" && (
        <>
          <div className={styles.check} aria-hidden="true">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="22" strokeWidth="2" />
              <path
                d="M14 24.5l7 7 13-14"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 id="account-title" className={styles.heading}>
            Welcome <em>back.</em>
          </h1>
          <p className={styles.sub}>You&rsquo;re signed in. Redirecting…</p>
        </>
      )}

      {phase === "error" && (
        <>
          <div className={styles.errorIcon} aria-hidden="true">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="22" strokeWidth="2" />
              <path
                d="M16 16l16 16M32 16L16 32"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 id="account-title" className={styles.heading}>
            Something went <em>wrong.</em>
          </h1>
          <p className={styles.sub}>{errorMsg}</p>
          <Link href="/login" className={styles.retry}>
            Back to sign&#8209;in
          </Link>
        </>
      )}
    </div>
  );
}