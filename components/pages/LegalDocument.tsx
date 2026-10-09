import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUp, CaretDown } from "@phosphor-icons/react/dist/ssr";
import interior from "./Interior.module.css";
import styles from "./LegalDocument.module.css";

type LegalSection = { id: string; title: string };

function Contents({ sections }: { sections: LegalSection[] }) {
  return (
    <ol className={styles.contentsList}>
      {sections.map((section) => (
        <li key={section.id}>
          <a href={`#${section.id}`}>{section.title}</a>
        </li>
      ))}
    </ol>
  );
}

export default function LegalDocument({
  kind,
  title,
  updated,
  sections,
  children,
}: {
  kind: "privacy" | "terms";
  title: ReactNode;
  updated: string;
  sections: LegalSection[];
  children: ReactNode;
}) {
  return (
    <div className={interior.page} id="page-content">
      <div className={`${interior.container} ${styles.document}`}>
        <header className={styles.heading}>
          <p className={interior.eyebrow}>Legal information</p>
          <h1 className={interior.title}>{title}</h1>
          <p className={styles.updated}>Last Updated: {updated}</p>
          <nav className={styles.policies} aria-label="Legal documents">
            <Link
              href="/privacy"
              aria-current={kind === "privacy" ? "page" : undefined}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              aria-current={kind === "terms" ? "page" : undefined}
            >
              Terms &amp; Conditions
            </Link>
          </nav>
        </header>
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <nav aria-label="On this page">
              <p className={styles.contentsTitle}>On this page</p>
              <Contents sections={sections} />
            </nav>
          </aside>
          <div className={styles.readingColumn}>
            <details className={styles.mobileContents}>
              <summary>
                On this page <CaretDown size={16} aria-hidden="true" />
              </summary>
              <nav aria-label="On this page">
                <Contents sections={sections} />
              </nav>
            </details>
            <article
              className={styles.body}
              aria-label={
                kind === "privacy" ? "Privacy Policy" : "Terms & Conditions"
              }
            >
              {children}
            </article>
            <a className={styles.backToTop} href="#page-content">
              Back to top <ArrowUp size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
