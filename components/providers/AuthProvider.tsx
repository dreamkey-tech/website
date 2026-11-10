"use client";

import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { PhonePromptModal } from "@/components/auth/PhonePromptModal";

/**
 * Mounts on every page. On first load it hydrates the auth store from the
 * active session. If the user is logged in but has no phone number saved the
 * <PhonePromptModal> is shown once per browser session (dismissal is stored in
 * sessionStorage so it doesn't reappear on SPA navigation or soft refreshes).
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { refreshUser, setUser } = useAuthStore();
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const checked = useRef(false);

  useEffect(() => {
    if (checked.current) return;
    checked.current = true;

    refreshUser().then(() => {
      // After session hydration the store now has the latest user object.
      // We read it directly from the store rather than relying on closure
      // state so the effect captures the freshest value.
      const latestUser = useAuthStore.getState().user;
      if (
        latestUser &&
        !latestUser.phone &&
        !sessionStorage.getItem("dk_phone_prompt_dismissed")
      ) {
        setPhoneModalOpen(true);
      }
    });
    // refreshUser is stable (Zustand selector); intentional single-run.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClose() {
    setPhoneModalOpen(false);
    sessionStorage.setItem("dk_phone_prompt_dismissed", "1");
  }

  function handlePhoneSuccess(updatedUser: Parameters<typeof setUser>[0]) {
    setUser(updatedUser);
    setPhoneModalOpen(false);
    sessionStorage.setItem("dk_phone_prompt_dismissed", "1");
  }

  return (
    <>
      {children}
      <PhonePromptModal
        isOpen={phoneModalOpen}
        onClose={handleClose}
        onSuccess={handlePhoneSuccess}
      />
    </>
  );
}
