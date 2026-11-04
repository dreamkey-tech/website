import Image from "next/image";
import styles from "./PageLoading.module.css";

/** Used by Next-owned route and navigation pending states. */
export default function PageLoading({
  label = "Loading your page…",
}: {
  label?: string;
}) {
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
          sizes="(min-width: 1920px) 208px, (min-width: 1480px) 11vw, 160px"
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
        <p className={styles.label}>{label}</p>
      </div>
    </div>
  );
}
