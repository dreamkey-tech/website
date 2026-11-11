import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import BrandLogo from "@/components/layout/BrandLogo";
import CookiePreferencesButton from "@/components/analytics/CookiePreferencesButton";
import LinkStyle from "@/components/layout/FooterTextLink.module.css";
import styles from "@/components/auth/Auth.module.css";
import OAuthCallbackClient from "./OAuthCallbackClient";

export const metadata = {
  title: "Signing in… | DreamkeyKol Reality",
  robots: { index: false, follow: false },
};

/** Invisible skeleton — prevents layout shift while params resolve. */
function CallbackSkeleton() {
  return (
    <div
      style={{ width: "100%", maxWidth: "26.25rem", marginInline: "auto", marginBlock: "auto" }}
      aria-busy="true"
      aria-label="Loading sign-in"
    />
  );
}

export default function OAuthCallbackPage() {
  return (
    <div className={styles.page} id="page-content">
      <div className={styles.container}>
        {/* ── Header ── */}
        <header className={styles.header}>
          <BrandLogo />
          <Link className={styles.backLink} href="/">
            <ArrowLeft size="1.0625rem" aria-hidden="true" /> Back to website
          </Link>
        </header>

        {/* ── Two-column layout mirrors login/register ── */}
        <div className={styles.layout}>
          {/* Left — decorative photo (hidden below 900 px via Auth.module.css) */}
          <aside className={styles.photo} aria-label="A home in Kolkata">
            <Image
              src="/images/kolkata-urbana-inspired-hero.webp"
              alt="Illustrative Kolkata-inspired residential high-rises in warm afternoon light"
              fill
              sizes="(max-width: 900px) 1px, (max-width: 1480px) 52vw, (max-width: 1920px) 46vw, 900px"
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

          {/* Right — callback state panel */}
          <section
            className={styles.formPanel}
            id="account-form"
            aria-labelledby="account-title"
          >
            {/*
              useSearchParams() must be inside a Suspense boundary in Next 16.
              Skeleton is intentionally blank to avoid visible flicker.
            */}
            <Suspense fallback={<CallbackSkeleton />}>
              <OAuthCallbackClient />
            </Suspense>
          </section>
        </div>

        {/* ── Footer ── */}
        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Dream Key Reality</p>
          <nav aria-label="Account support and legal information">
            <Link href="/contact" className={`${LinkStyle.link} ${LinkStyle.compact}`}>
              Need help?
            </Link>
            <Link href="/privacy" className={`${LinkStyle.link} ${LinkStyle.compact}`}>
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className={`${LinkStyle.link} ${LinkStyle.compact}`}>
              Terms &amp; Conditions
            </Link>
          </nav>
          <CookiePreferencesButton />
        </footer>
      </div>
    </div>
  );
}
