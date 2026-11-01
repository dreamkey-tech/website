"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { authApi } from "@/api/auth";
import { authPageHref } from "@/lib/auth-return";
import AuthFormFrame from "./AuthFormFrame";
import RecoveryEmailForm from "./RecoveryEmailForm";
import OtpVerificationForm from "./OtpVerificationForm";
import ResetPasswordForm from "./ResetPasswordForm";
import styles from "./Auth.module.css";

type RecoveryStep =
  | { phase: "email"; email: string }
  | { phase: "code"; email: string; message?: string }
  | { phase: "password"; email: string; otp: string }
  | { phase: "done" };

export default function PasswordRecovery({ returnTo }: { returnTo?: string }) {
  const [step, setStep] = useState<RecoveryStep>({ phase: "email", email: "" });
  const headings = {
    email: (
      <>
        Let’s get you <em>back in.</em>
      </>
    ),
    code: (
      <>
        Check your <em>inbox.</em>
      </>
    ),
    password: (
      <>
        A fresh <em>start.</em>
      </>
    ),
    done: (
      <>
        You’re all <em>set.</em>
      </>
    ),
  };
  const descriptions = {
    email: "Enter your account email to reset your password.",
    code: "Enter your 4-digit password reset code.",
    password: "Choose and confirm your new password.",
    done: "Your password has been updated. Sign in again to continue.",
  };
  return (
    <AuthFormFrame
      mode="recovery"
      returnTo={returnTo}
      title={headings[step.phase]}
      description={descriptions[step.phase]}
    >
      {step.phase === "email" && (
        <RecoveryEmailForm
          initialEmail={step.email}
          onSent={(email, message) =>
            setStep({ phase: "code", email, message })
          }
        />
      )}
      {step.phase === "code" && (
        <OtpVerificationForm
          email={step.email}
          purpose="PASSWORD_RESET"
          initialMessage={step.message}
          onVerify={async (otp, signal) => {
            await authApi.verifyResetOtp({ email: step.email, otp }, signal);
            if (!signal.aborted)
              setStep({ phase: "password", email: step.email, otp });
          }}
          onBack={() => setStep({ phase: "email", email: step.email })}
        />
      )}
      {step.phase === "password" && (
        <ResetPasswordForm
          email={step.email}
          otp={step.otp}
          onDone={() => setStep({ phase: "done" })}
          onNewCode={() => setStep({ phase: "email", email: step.email })}
        />
      )}
      {step.phase === "done" && (
        <div className={styles.recoverySuccess} role="status">
          <CheckCircle size={42} weight="light" aria-hidden="true" />
          <p>Use your new password the next time you log in.</p>
          <Link
            href={authPageHref("/login", returnTo)}
            className={styles.submit}
          >
            Back to log in
          </Link>
        </div>
      )}
    </AuthFormFrame>
  );
}
