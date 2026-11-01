"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./PropertyAccess.module.css";
export default function PropertyLoadError() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <section className={styles.locked} aria-labelledby="property-load-error">
      <h1 id="property-load-error">We couldn’t load this listing.</h1>
      <p>Please try again in a moment.</p>
      <div>
        <button
          type="button"
          disabled={pending}
          onClick={() => startTransition(() => router.refresh())}
        >
          {pending ? "Loading listing…" : "Try again"}
        </button>
        <Link href="/buy">Back to properties</Link>
      </div>
    </section>
  );
}
