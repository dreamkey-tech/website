import { Plus } from "@phosphor-icons/react/dist/ssr";
import styles from "./Interior.module.css";
import FAQItem from "./FAQItem";

export default function PageFAQ({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className={styles.faqList}>
      {items.map((item) => (
        <FAQItem
          key={item.question}
          summary={
            <summary>
              {item.question}
              <Plus size={20} aria-hidden="true" />
            </summary>
          }
          answer={<p>{item.answer}</p>}
        />
      ))}
    </div>
  );
}
