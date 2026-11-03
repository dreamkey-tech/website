"use client";

import type { ReactNode } from "react";
import { openCookiePreferences } from "@/lib/consent";
import styles from "./CookieConsent.module.css";

export default function CookiePreferencesButton({
  className,
  children = "Cookie preferences",
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      className={className ?? styles.preferencesLink}
      onClick={openCookiePreferences}
      data-analytics-ignore
    >
      {children}
    </button>
  );
}
