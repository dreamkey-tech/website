"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { subscribeConsent } from "@/lib/consent";
import {
  GA_ID,
  ANALYTICS_DEBUG,
  analyticsEnabled,
  analyticsAllowed,
  prepareGoogleTag,
  safePageURL,
  trackPageView,
  updateGoogleConsent,
  googleConfigured,
  flushAnalyticsEvents,
} from "@/lib/analytics";
import InteractionTracking from "./InteractionTracking";
import CookieConsent from "./CookieConsent";

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const [started, setStarted] = useState(false);
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    // Defaults and safe global configuration precede the official component's config.
    if (analyticsEnabled) prepareGoogleTag();
    return subscribeConsent(() => {
      const next = analyticsEnabled && updateGoogleConsent();
      setAllowed(next);
      if (next) setStarted(true);
    });
  }, []);

  useEffect(() => {
    if (!allowed || !started) return;
    // The official init script queues config once. Wait for it, never a network request.
    // This also handles Next Script's client mount ordering and blocked external scripts.
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    let attempts = 0;
    const check = () => {
      if (cancelled || !analyticsAllowed()) return;
      if (googleConfigured()) {
        trackPageView(pathname);
        flushAnalyticsEvents();
      } else if (++attempts < 100) timer = setTimeout(check, 50);
    };
    check();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [allowed, started, pathname]);

  return (
    <>
      {started && <GoogleAnalytics gaId={GA_ID} debugMode={ANALYTICS_DEBUG} />}
      {allowed && (
        <VercelAnalytics
          beforeSend={(event) =>
            analyticsAllowed()
              ? { ...event, url: safePageURL(event.url) }
              : null
          }
        />
      )}
      <InteractionTracking pathname={pathname} allowed={allowed} />
      <CookieConsent />
    </>
  );
}
