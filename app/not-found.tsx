import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import styles from "@/components/pages/Interior.module.css";

export default function NotFound() {
  return (
    <div className={styles.page} id="page-content">
      <div className={styles.container}>
        <section className={styles.notFound} aria-labelledby="not-found-title">
          <p className={styles.eyebrow}>404 · Page not found</p>
          <h1 className={styles.title} id="not-found-title">
            Let’s find your <em>next page.</em>
          </h1>
          <p className={styles.lead}>
            This page may have moved, or the link may be incorrect.
          </p>
          <div className={styles.heroActions}>
            <Link href="/" className={styles.primaryButton}>
              <ArrowLeft size="1.0625rem" aria-hidden="true" /> Back to home
            </Link>
            <Link href="/buy" className={styles.textLink}>
              Browse properties
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
