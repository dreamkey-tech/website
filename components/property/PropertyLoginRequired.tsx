"use client";
import { useEffect } from "react";
import Link from "next/link";
import { LockKey } from "@phosphor-icons/react";
import { authPageHref } from "@/lib/auth-return";
import { usePropertyAccess } from "./PropertyAccessProvider";
import styles from "./PropertyAccess.module.css";

export default function PropertyLoginRequired({ href }: { href: string }) {
  const openLogin = usePropertyAccess();
  useEffect(() => {
    const timer = window.setTimeout(() => openLogin(href), 0);
    return () => window.clearTimeout(timer);
  }, [href, openLogin]);
  return (
    <section className={styles.locked} aria-labelledby="locked-property-title">
      <LockKey size="2.125rem" weight="light" aria-hidden="true" />
      <h1 id="locked-property-title">
        Your next place. <em>A closer look.</em>
      </h1>
      <p>
        Log in to see photographs, full specifications and the details for this
        property.
      </p>
      <div>
        <button type="button" onClick={() => openLogin(href)}>
          Log in to continue
        </button>
        <Link href="/buy">Back to properties</Link>
      </div>
      <noscript>
        <p>
          <a href={authPageHref("/login", href)}>Open the login page</a> to
          continue.
        </p>
      </noscript>
    </section>
  );
}
