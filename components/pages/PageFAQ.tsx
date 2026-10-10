import { Plus } from "@phosphor-icons/react/dist/ssr";
import styles from "./Interior.module.css";

export default function PageFAQ({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className={styles.faqList}>
      {items.map((item) => (
        <details key={item.question}>
          <summary>
            {item.question}
            <Plus size={20} aria-hidden="true" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
