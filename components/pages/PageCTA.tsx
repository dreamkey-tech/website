import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import styles from "./Interior.module.css";

export default function PageCTA({
  title,
  copy,
  label = "Let’s talk",
  href = "/contact",
}: {
  title: string;
  copy: string;
  label?: string;
  href?: string;
}) {
  return (
    <section className={styles.cta} aria-label={title}>
      <div>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <Link
        className={styles.primaryButton}
        href={href}
        data-analytics-event="cta_click"
        data-cta-name="page_contact"
        data-component-name="page_cta"
      >
        {label}
        <ArrowUpRight size="1.1875rem" aria-hidden="true" />
      </Link>
    </section>
  );
}
