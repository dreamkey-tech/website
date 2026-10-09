"use client";

import { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import styles from "./Auth.module.css";

export default function AuthField({
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
  placeholder,
  hint,
  disabled,
}: {
  name: "name" | "email" | "password";
  label: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete: string;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const id = `account-${name}`;
  const isPassword = type === "password";
  const description =
    [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.inputWrap}>
        <input
          id={id}
          name={name}
          type={isPassword && visible ? "text" : type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={description}
          className={isPassword ? styles.passwordInput : undefined}
        />
        {isPassword && (
          <button
            className={styles.passwordToggle}
            type="button"
            disabled={disabled}
            onClick={() => setVisible(!visible)}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            aria-controls={id}
          >
            {visible ? (
              <EyeSlash size={20} aria-hidden="true" />
            ) : (
              <Eye size={20} aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      {hint && (
        <p className={styles.hint} id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className={styles.fieldError} id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
