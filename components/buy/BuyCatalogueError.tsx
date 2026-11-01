"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./Buy.module.css";

export default function BuyCatalogueError() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className={styles.emptyState} role="status" aria-busy={pending}>
      <h2>We couldn’t load the properties.</h2>
      <p>Please try again, or ask our team to help with your search.</p>
      <div>
        <button
          className={styles.applyButton}
          type="button"
          disabled={pending}
          onClick={() => startTransition(() => router.refresh())}
        >
          {pending ? "Loading properties…" : "Try again"}
        </button>
        <Link href="/contact?purpose=buy">Talk to our team</Link>
      </div>
    </div>
  );
}
