"use client";
import Link from "next/link";
import type { ComponentProps } from "react";
import { useAuthStore } from "@/store/authStore";
import { usePropertyAccess } from "./PropertyAccessProvider";

export default function PropertyLink({
  href,
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "href" | "onClick"> & { href: string }) {
  const openLogin = usePropertyAccess();
  const authenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.isLoading);
  return (
    <Link
      {...props}
      href={href}
      prefetch={false}
      onClick={(event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.altKey ||
          event.shiftKey ||
          (props.target && props.target !== "_self") ||
          event.currentTarget.hasAttribute("download")
        )
          return;
        if (!loading && !authenticated) {
          event.preventDefault();
          openLogin(href);
        }
      }}
    >
      {children}
    </Link>
  );
}
