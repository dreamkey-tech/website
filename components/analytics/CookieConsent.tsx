"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { X } from "@phosphor-icons/react";
import {
  getConsentSnapshot,
  hasPrivacySignal,
  openCookiePreferences,
  PREFERENCES_OPEN_EVENT,
  saveConsent,
  subscribeConsent,
} from "@/lib/consent";
import styles from "./CookieConsent.module.css";

const serverSnapshot = () => null;
function subscribeBrowser(listener: () => void) {
  window.addEventListener("focus", listener);
  window.addEventListener("pageshow", listener);
  return () => {
    window.removeEventListener("focus", listener);
    window.removeEventListener("pageshow", listener);
  };
}
const noBrowserSignal = () => false;

export default function CookieConsent() {
  const preferences = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    serverSnapshot,
  );
  const privacyRequested = useSyncExternalStore(
    subscribeBrowser,
    hasPrivacySignal,
    noBrowserSignal,
  );
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const banner = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function openPreferences() {
      const saved = getConsentSnapshot();
      setAnalytics(!hasPrivacySignal() && !!saved?.analytics);
      setAdvertising(!hasPrivacySignal() && !!saved?.advertising);
      opener.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      if (!dialog.current?.open) dialog.current?.showModal();
    }

    window.addEventListener(PREFERENCES_OPEN_EVENT, openPreferences);
    return () =>
      window.removeEventListener(PREFERENCES_OPEN_EVENT, openPreferences);
  }, []);

  useEffect(() => {
    const element = banner.current;
    const root = document.documentElement;
    if (preferences || !element) {
      root.style.removeProperty("--dreamkey-consent-banner-height");
      return;
    }

    function measure() {
      root.style.setProperty(
        "--dreamkey-consent-banner-height",
        `${Math.ceil(element!.getBoundingClientRect().height)}px`,
      );
    }

    measure();
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    observer?.observe(element);
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      root.style.removeProperty("--dreamkey-consent-banner-height");
    };
  }, [preferences]);

  function choose(nextAnalytics: boolean, nextAdvertising: boolean) {
    saveConsent({
      analytics: !hasPrivacySignal() && nextAnalytics,
      advertising: !hasPrivacySignal() && nextAdvertising,
    });
    dialog.current?.close();
  }

  return (
    <div data-analytics-ignore>
      {!preferences && (
        <>
          <div className={styles.reservation} aria-hidden="true" />
          <section
            ref={banner}
            className={styles.banner}
            aria-label="Cookie choices"
            data-cookie-consent-banner
          >
            <div className={styles.bannerInner}>
              <div className={styles.bannerCopy}>
                <h2>Your privacy, your choice.</h2>
                <p>
                  Essential cookies keep the site working. Optional cookies help
                  us understand visits and measure enquiries. Choose what suits
                  you. <Link href="/privacy#section-4">Privacy policy</Link>
                </p>
                {privacyRequested && (
                  <p className={styles.signal}>
                    Your browser requests privacy. Optional cookies stay off
                    while this setting is enabled.
                  </p>
                )}
              </div>
              <div className={styles.bannerActions}>
                <button
                  type="button"
                  className={styles.action}
                  onClick={() => choose(true, true)}
                >
                  Accept all
                </button>
                <button
                  type="button"
                  className={styles.action}
                  onClick={() => choose(false, false)}
                >
                  Reject optional
                </button>
                <button
                  type="button"
                  className={styles.action}
                  onClick={openCookiePreferences}
                >
                  Cookie preferences
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby="cookie-preferences-title"
        aria-describedby="cookie-preferences-description"
        onClose={() => {
          if (opener.current?.isConnected) opener.current.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 id="cookie-preferences-title">Cookie preferences</h2>
            <button
              type="button"
              className={styles.close}
              aria-label="Close cookie preferences"
              onClick={() => dialog.current?.close()}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <p id="cookie-preferences-description" className={styles.intro}>
            You decide which optional cookies we can use. Change your choice at
            any time using Cookie preferences in the footer.
          </p>
          {privacyRequested && (
            <p className={styles.signal}>
              Your browser sends a Global Privacy Control or Do Not Track
              signal. Optional cookies stay off while it is enabled.
            </p>
          )}
          <div className={styles.options}>
            <label className={styles.option}>
              <span>
                <strong>Essential</strong>
                <span>
                  Needed for sign-in, security and remembering these choices.
                  Always available.
                </span>
              </span>
              <input
                type="checkbox"
                checked
                disabled
                aria-label="Essential cookies, always available"
              />
            </label>
            <label className={styles.option}>
              <span>
                <strong>Analytics</strong>
                <span>
                  Google Analytics helps us understand page visits, property
                  interest and successful enquiries. Form contents are excluded.
                </span>
              </span>
              <input
                type="checkbox"
                checked={!privacyRequested && analytics}
                disabled={privacyRequested}
                onChange={(event) => setAnalytics(event.target.checked)}
                aria-label="Allow analytics cookies"
              />
            </label>
            <label className={styles.option}>
              <span>
                <strong>Advertising</strong>
                <span>
                  Allows Google advertising data and personalization signals
                  when analytics is also enabled. No separate advertising tag is
                  installed.
                </span>
              </span>
              <input
                type="checkbox"
                checked={!privacyRequested && advertising}
                disabled={privacyRequested}
                onChange={(event) => setAdvertising(event.target.checked)}
                aria-label="Allow advertising cookies"
              />
            </label>
          </div>
          <p className={styles.retention}>
            Your choice is remembered for 180 days. Read our{" "}
            <Link
              href="/privacy#section-4"
              onClick={() => dialog.current?.close()}
            >
              privacy policy
            </Link>
            .
          </p>
          <div className={styles.panelActions}>
            <button
              type="button"
              className={`${styles.action} ${styles.save}`}
              onClick={() => choose(analytics, advertising)}
            >
              Save preferences
            </button>
            <button
              type="button"
              className={styles.action}
              onClick={() => choose(false, false)}
            >
              Reject optional
            </button>
            <button
              type="button"
              className={styles.action}
              onClick={() => choose(true, true)}
            >
              Accept all
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
