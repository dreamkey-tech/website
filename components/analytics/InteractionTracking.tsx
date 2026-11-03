"use client";

import { useEffect, useRef } from "react";
import {
  trackEvent,
  type AnalyticsEvent,
  type AnalyticsParams,
} from "@/lib/analytics";

function component(element: Element): string {
  return (
    element.closest<HTMLElement>("[data-analytics-component]")?.dataset
      .analyticsComponent ||
    element.closest<HTMLElement>("[data-component-name]")?.dataset
      .componentName ||
    (element.closest("header")
      ? "header"
      : element.closest("footer")
        ? "footer"
        : "main_content")
  );
}
function propertyParams(element: HTMLElement): AnalyticsParams {
  const source = element.closest<HTMLElement>("[data-property-id]") || element;
  return {
    property_id: source.dataset.propertyId,
    property_type: source.dataset.propertyType,
    transaction_type: source.dataset.transactionType,
    inventory_source: source.dataset.inventorySource,
    item_list_name: source.dataset.listName,
    component_name:
      element.dataset.analyticsImpression === "detail"
        ? "property_details"
        : "property_card",
  };
}
const clickEvents = new Set([
  "cta_click",
  "service_interest",
  "select_item",
  "property_enquiry_click",
]);

export default function InteractionTracking({
  pathname,
  allowed,
}: {
  pathname: string;
  allowed: boolean;
}) {
  const impressions = useRef({
    pathname,
    seen: new WeakMap<Element, string>(),
    allowed: false,
  });
  useEffect(() => {
    function click(event: MouseEvent) {
      if (event.button !== 0 || !(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("a,button");
      if (!element || element.closest("[data-analytics-ignore]")) return;
      const href = element instanceof HTMLAnchorElement ? element.href : "";
      let contact: AnalyticsEvent | undefined;
      if (href.startsWith("tel:")) contact = "phone_click";
      else if (href.startsWith("mailto:")) contact = "email_click";
      else {
        try {
          if (
            ["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(
              new URL(href).hostname,
            )
          )
            contact = "whatsapp_click";
        } catch {
          /* Not a URL. */
        }
      }
      if (contact) {
        trackEvent(contact, {
          ...propertyParams(element),
          component_name: component(element),
        });
        return;
      }
      const marked = element.closest<HTMLElement>("[data-analytics-event]");
      if (marked && clickEvents.has(marked.dataset.analyticsEvent || "")) {
        trackEvent(marked.dataset.analyticsEvent as AnalyticsEvent, {
          ...propertyParams(marked),
          component_name: component(marked),
          service_name: marked.dataset.serviceName,
          cta_name: marked.dataset.ctaName,
        });
        return;
      }
      if (!href || element.hasAttribute("data-analytics-ignore-click")) return;
      try {
        const target = new URL(href);
        if (target.origin !== window.location.origin) {
          if (!["http:", "https:"].includes(target.protocol)) return;
          const domain = target.hostname.replace(/^www\./, "");
          trackEvent("cta_click", {
            component_name: component(element),
            cta_name: "outbound_link",
            destination_domain: [
              "instagram.com",
              "youtube.com",
              "facebook.com",
              "linkedin.com",
              "google.com",
            ].includes(domain)
              ? domain
              : "other",
          });
          return;
        }
        const name =
          target.pathname === "/" ? "home" : target.pathname.slice(1);
        trackEvent("cta_click", {
          component_name: component(element),
          cta_name: `nav_${name}`,
          destination_path: target.pathname,
        });
      } catch {
        /* Navigation always proceeds even if tracking fails. */
      }
    }
    function submit(event: Event) {
      const form = event.target;
      if (!(form instanceof HTMLFormElement) || !form.dataset.analyticsSearch)
        return;
      const data = new FormData(form);
      trackEvent("property_search", {
        component_name: component(form),
        transaction_type: form.dataset.analyticsSearch,
        interaction_type: "submit",
        search_term_present: !!String(data.get("q") || "").trim(),
      });
    }
    // Capture preserves intent when anonymous property links subsequently open Login.
    document.addEventListener("click", click, true);
    document.addEventListener("submit", submit, true);
    return () => {
      document.removeEventListener("click", click, true);
      document.removeEventListener("submit", submit, true);
    };
  }, []);

  useEffect(() => {
    if (!allowed) {
      impressions.current.allowed = false;
      return;
    }
    if (typeof IntersectionObserver === "undefined") return;
    if (
      impressions.current.pathname !== pathname ||
      !impressions.current.allowed
    )
      impressions.current = {
        pathname,
        seen: new WeakMap<Element, string>(),
        allowed: true,
      };
    const seen = impressions.current.seen;
    const observing = new Map<Element, string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          if (
            !element.isConnected ||
            !["list", "detail"].includes(
              element.dataset.analyticsImpression || "",
            )
          )
            continue;
          const identity = `${element.dataset.analyticsImpression}:${element.dataset.propertyId}`;
          if (seen.get(element) === identity) continue;
          if (
            trackEvent(
              element.dataset.analyticsImpression === "detail"
                ? "view_item"
                : "view_item_list",
              propertyParams(element),
            )
          )
            seen.set(element, identity);
        }
      },
      { threshold: 0.1 },
    );
    function scan() {
      observing.forEach((_, element) => {
        if (
          !element.isConnected ||
          !element.hasAttribute("data-analytics-impression")
        ) {
          observer.unobserve(element);
          observing.delete(element);
        }
      });
      document
        .querySelectorAll<HTMLElement>("[data-analytics-impression]")
        .forEach((element) => {
          const identity = `${element.dataset.analyticsImpression}:${element.dataset.propertyId}`;
          if (observing.get(element) !== identity) {
            observer.unobserve(element);
            observer.observe(element);
            observing.set(element, identity);
          }
        });
    }
    scan();
    const changes = new MutationObserver(scan);
    changes.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-analytics-impression", "data-property-id"],
    });
    return () => {
      changes.disconnect();
      observer.disconnect();
    };
  }, [allowed, pathname]);
  return null;
}
