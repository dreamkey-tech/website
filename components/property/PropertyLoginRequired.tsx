"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockKey } from "@phosphor-icons/react";
import { authPageHref } from "@/lib/auth-return";
import { useAuthStore } from "@/store/authStore";
import { getAuthToken, ensureSessionCookies, apiClient } from "@/api/client";
import { propertyDetailSchema, type WebsiteProperty } from "@/lib/website-properties";
import LivePropertyDetails from "./LivePropertyDetails";
import PropertySession from "./PropertySession";
import { usePropertyAccess } from "./PropertyAccessProvider";
import styles from "./PropertyAccess.module.css";

export default function PropertyLoginRequired({ href }: { href: string }) {
  const openLogin = usePropertyAccess();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [clientProperty, setClientProperty] = useState<WebsiteProperty | null>(null);
  const isFetching = useRef(false);

  // Extract property UUID from href (e.g. "/buy/7bffa24a-a850-4033-bf35-d92df9738122")
  const idMatch = href.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  const propertyId = idMatch ? idMatch[0].toLowerCase() : null;

  useEffect(() => {
    const token = getAuthToken();
    const isAuthed = isAuthenticated || !!token;

    if (isAuthed && propertyId && !clientProperty && !isFetching.current) {
      isFetching.current = true;
      ensureSessionCookies(token || undefined);

      let active = true;
      apiClient
        .get(`/v1/website/properties/list/${encodeURIComponent(propertyId)}`)
        .then((res) => {
          if (!active) return;
          if (res.data?.success && res.data?.property) {
            const parsed = propertyDetailSchema.safeParse(res.data.property);
            if (parsed.success) {
              setClientProperty(parsed.data);
              router.refresh();
            }
          }
        })
        .finally(() => {
          if (active) isFetching.current = false;
        });

      return () => {
        active = false;
      };
    }

    // Only prompt for login when definitively unauthenticated
    if (!isLoading && !isAuthed) {
      const timer = window.setTimeout(() => openLogin(href), 0);
      return () => window.clearTimeout(timer);
    }
  }, [href, openLogin, isAuthenticated, isLoading, propertyId, clientProperty, router]);

  if (clientProperty) {
    return (
      <PropertySession
        key={clientProperty.id}
        id={clientProperty.id}
        propertyType={clientProperty.propertyType}
        transactionType={clientProperty.pricingType === "RENT" ? "rent" : "buy"}
      >
        <LivePropertyDetails property={clientProperty} />
      </PropertySession>
    );
  }

  return (
    <section className={styles.locked} aria-labelledby="locked-property-title">
      <LockKey size="2.125rem" weight="light" aria-hidden="true" />
      <h1 id="locked-property-title">
        Your next place. <em>A closer look.</em>
      </h1>
      <p>
        Log in to see photographs, full specifications and the details for this
        property.
      </p>
      <div>
        <button type="button" onClick={() => openLogin(href)}>
          Log in to continue
        </button>
        <Link href="/buy">Back to properties</Link>
      </div>
      <noscript>
        <p>
          <a href={authPageHref("/login", href)}>Open the login page</a> to
          continue.
        </p>
      </noscript>
    </section>
  );
}
