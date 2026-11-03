import PageLoading from "@/components/navigation/PageLoading";
import styles from "@/components/navigation/PageLoading.module.css";

export default function PropertyLoading() {
  return (
    <div className={styles.placeholder}>
      <PageLoading label="Opening property…" />
    </div>
  );
}
