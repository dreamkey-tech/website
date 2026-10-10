import Image from "next/image";
import styles from "./PageLoading.module.css";

/** Rendered only while Next's route boundary is waiting for page content. */
export default function PageLoading() {
  return (
    <div
      className={styles.screen}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className={styles.content}>
        <Image
          src="/logo.webp"
          alt=""
          width={160}
          height={96}
          loading="eager"
          className={styles.logo}
        />
        <p className={styles.brand}>
          Dream Key <span>Reality</span>
        </p>
        <div className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className={styles.label}>Loading your page…</p>
      </div>
    </div>
  );
}
