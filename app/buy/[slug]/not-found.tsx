import Link from "next/link";
import styles from "@/components/pages/Interior.module.css";

export default function PropertyNotFound() {
  return (
    <div className={styles.page} id="page-content">
      <div className={styles.container}>
        <h1 className={styles.title}>This home isn’t in our collection.</h1>
        <p className={styles.lead}>
          Explore the collection or tell our Kolkata team what you’re looking
          for.
        </p>
        <Link className={styles.primaryButton} href="/buy">
          Back to properties
        </Link>
      </div>
    </div>
  );
}
