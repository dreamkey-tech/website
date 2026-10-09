import type { ReactNode } from "react";
import styles from "./Interior.module.css";

export default function EnquiryField({
  id,
  label,
  required,
  error,
  hint,
  children,
  wide,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`${styles.field} ${wide ? styles.fieldWide : ""}`}>
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {hint && <small id={`${id}-hint`}>{hint}</small>}
      {error && (
        <small className={styles.fieldError} id={`${id}-error`}>
          {error}
        </small>
      )}
    </div>
  );
}
