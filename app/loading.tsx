import PageLoading from "@/components/navigation/PageLoading";
import styles from "@/components/navigation/PageLoading.module.css";

export default function Loading() {
  return (
    <div className={styles.placeholder}>
      <PageLoading />
    </div>
  );
}
