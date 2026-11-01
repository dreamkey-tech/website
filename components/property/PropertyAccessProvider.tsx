"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "@phosphor-icons/react";
import AuthForm from "@/components/auth/AuthForm";
import { safeAuthReturnTo } from "@/lib/auth-return";
import styles from "./PropertyAccess.module.css";

const AccessContext = createContext<((href: string) => void) | null>(null);
export function usePropertyAccess() {
  const open = useContext(AccessContext);
  if (!open) throw new Error("Property access provider is missing");
  return open;
}
export default function PropertyAccessProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [target, setTarget] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "register">("login");
  const open = useCallback((href: string) => {
    setMode("login");
    setTarget(safeAuthReturnTo(href));
  }, []);
  return (
    <AccessContext.Provider value={open}>
      {children}
      {target && (
        <PropertyLoginModal
          key={target}
          target={target}
          mode={mode}
          onModeChange={setMode}
          onClose={() => setTarget(null)}
        />
      )}
    </AccessContext.Provider>
  );
}
function PropertyLoginModal({
  target,
  mode,
  onModeChange,
  onClose,
}: {
  target: string;
  mode: "login" | "register";
  onModeChange: (mode: "login" | "register") => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      dialog.current?.querySelector<HTMLInputElement>("input")?.focus(),
    );
    return () => cancelAnimationFrame(frame);
  }, [mode]);
  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby="account-title"
      aria-describedby="property-login-reason"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close();
      }}
    >
      <div className={styles.dialogHeader}>
        <p id="property-login-reason">
          Log in to view the full property listing.
        </p>
        <button
          type="button"
          aria-label="Close login popup"
          onClick={() => dialog.current?.close()}
        >
          <X size={21} aria-hidden="true" />
        </button>
      </div>
      <AuthForm
        key={mode}
        mode={mode}
        returnTo={target}
        onModeChange={onModeChange}
        onAuthenticated={() => {
          onClose();
          router.push(target);
          router.refresh();
        }}
      />
      <p className={styles.legal}>
        Read our <Link href="/privacy">Privacy Policy</Link> and{" "}
        <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>.
      </p>
    </dialog>
  );
}
