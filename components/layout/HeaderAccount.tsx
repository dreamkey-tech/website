"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { CaretDown, SignOut, User } from "@phosphor-icons/react";

export default function HeaderAccount() {
  const { user, isAuthenticated, logout } = useAuthStore();
  if (!isAuthenticated) {
    return (
      <Link href="/login" className="home-login">
        Log in <User size="1.0625rem" aria-hidden="true" />
      </Link>
    );
  }
  return (
    <details
      className="home-account"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.currentTarget.open = false;
          event.currentTarget.querySelector("summary")?.focus();
        }
      }}
    >
      <summary className="home-login">
        <User size="1.0625rem" aria-hidden="true" />
        <span>{user?.name?.split(" ")[0] || "Account"}</span>
        <CaretDown size="0.75rem" aria-hidden="true" />
      </summary>
      <div className="home-account__panel">
        <button type="button" onClick={() => void logout()}>
          <SignOut size="1rem" aria-hidden="true" /> Sign out
        </button>
      </div>
    </details>
  );
}
