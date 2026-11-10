"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "@phosphor-icons/react";
import { authApi, type WebsiteUser } from "@/api/auth";
import { authErrorDetails } from "./auth-errors";
import styles from "./Auth.module.css";
import modalStyles from "./PhonePromptModal.module.css";

interface PhonePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (updatedUser: WebsiteUser) => void;
}

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

export function PhonePromptModal({
  isOpen,
  onClose,
  onSuccess,
}: PhonePromptModalProps) {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Focus the phone input when the modal opens
  useEffect(() => {
    if (isOpen) {
      const id = window.setTimeout(
        () => phoneInputRef.current?.focus(),
        50,
      );
      return () => window.clearTimeout(id);
    }
  }, [isOpen]);

  // Abort any in-flight request when the modal closes.
  // State resets are deferred so they don't cascade during active renders.
  useEffect(() => {
    if (isOpen) return;
    abortRef.current?.abort();
  }, [isOpen]);

  // Trap focus and handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    }
    window.addEventListener("keydown", handleKey, true);
    return () => window.removeEventListener("keydown", handleKey, true);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const clean = phoneNumber.trim();
    if (!clean) {
      setError("Please enter your mobile number.");
      phoneInputRef.current?.focus();
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    try {
      const result = await authApi.updatePhone(
        clean,
        countryCode,
        controller.signal,
      );
      if (controller.signal.aborted) return;
      onSuccess?.(result.user);
      onClose();
    } catch (err: unknown) {
      if (controller.signal.aborted) return;
      setError(
        authErrorDetails(
          err,
          "We couldn't save your number. Please check and try again.",
        ).message,
      );
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }

  return (
    /* Backdrop */
    <div
      className={modalStyles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="phone-modal-title"
      onClick={(e) => {
        // Close on backdrop click, not on dialog content click
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={modalStyles.dialog}>
        {/* Header */}
        <div className={modalStyles.header}>
          <h2 id="phone-modal-title" className={modalStyles.title}>
            Add your phone number
          </h2>
          <button
            type="button"
            className={modalStyles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            <X size="1.125rem" aria-hidden="true" weight="bold" />
          </button>
        </div>

        <p className={modalStyles.description}>
          Add your mobile so our advisors can share property updates and site
          visit schedules. This is completely optional.
        </p>

        {error && (
          <p className={styles.apiError} role="alert">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className={modalStyles.phoneRow}>
            <label
              htmlFor="phone-modal-code"
              className={modalStyles.srOnly}
            >
              Country code
            </label>
            <select
              id="phone-modal-code"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              disabled={loading}
              className={modalStyles.codeSelect}
            >
              {COUNTRY_CODES.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>
            <label htmlFor="phone-modal-number" className={modalStyles.srOnly}>
              Phone number
            </label>
            <input
              ref={phoneInputRef}
              id="phone-modal-number"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="98765 43210"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/[^\d\s\-]/g, ""))
              }
              disabled={loading}
              className={modalStyles.phoneInput}
            />
          </div>

          <div className={modalStyles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={modalStyles.skipButton}
              disabled={loading}
            >
              Skip for now
            </button>
            <button
              type="submit"
              disabled={loading}
              className={modalStyles.saveButton}
            >
              {loading ? "Saving…" : "Save number"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
