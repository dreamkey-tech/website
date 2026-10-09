import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import BrandLogo from "@/components/layout/BrandLogo";
import interior from "@/components/pages/Interior.module.css";
import styles from "./Auth.module.css";

export default function AuthPageShell({ children }: { children: ReactNode }) {
  return (
    <div className={`${interior.page} ${styles.page}`} id="page-content">
      <div className={styles.container}>
        <header className={styles.header}>
          <a className={interior.skipLink} href="#account-form">
            Skip to form
          </a>
          <BrandLogo />
          <Link className={styles.backLink} href="/">
            <ArrowLeft size={17} aria-hidden="true" /> Back to website
          </Link>
        </header>
        <div className={styles.layout}>
          <aside className={styles.photo} aria-label="A home in Kolkata">
            <Image
              src="/images/kolkata-urbana-inspired-hero.webp"
              alt="Illustrative Kolkata-inspired residential high-rises in warm afternoon light"
              fill
              sizes="(max-width: 900px) 1px, (max-width: 1440px) 52vw, 720px"
              loading="eager"
              fetchPriority="high"
              className={styles.image}
            />
            <div className={styles.photoCopy}>
              <h2>
                A place to call <em>your own.</em>
              </h2>
              <p>Homes That Match Your Pace, Not Just Your Budget.</p>
            </div>
          </aside>
          <section
            className={styles.formPanel}
            id="account-form"
            aria-labelledby="account-title"
          >
            {children}
          </section>
        </div>
        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Dream Key Reality</p>
          <nav aria-label="Account support and legal information">
            <Link href="/contact">Need help?</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
