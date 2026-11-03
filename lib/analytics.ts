import { getConsentSnapshot, hasPrivacySignal } from "@/lib/consent";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const ANALYTICS_DEBUG =
  process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true";
export const analyticsEnabled =
  /^G-[A-Z0-9]+$/.test(GA_ID) &&
  (process.env.NODE_ENV === "production" || ANALYTICS_DEBUG);
export type AnalyticsEvent =
  | "page_view"
  | "cta_click"
  | "form_start"
  | "generate_lead"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "property_search"
  | "view_item_list"
  | "select_item"
  | "view_item"
  | "property_enquiry_click"
  | "service_interest";
type Value = string | boolean | number;
export type AnalyticsParams = Record<string, Value | undefined>;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
const routes: Record<string, string> = {
  "/": "Home",
  "/buy": "Buy",
  "/rent": "Rent",
  "/sell": "Sell",
  "/services": "Services",
  "/about": "About",
  "/contact": "Contact",
  "/privacy": "Privacy",
  "/terms-and-conditions": "Terms",
  "/login": "Login",
  "/register": "Register",
  "/forgot-password": "Password recovery",
  "/careers": "Careers",
};
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function safePath(path: string): string {
  const pathname = path.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  return routes[pathname]
    ? pathname
    : /^\/buy\/[0-9a-f-]{36}$/i.test(pathname) && uuid.test(pathname.slice(5))
      ? pathname
      : "/not-found";
}
export function safePageURL(input: string): string {
  try {
    const url = new URL(input);
    return `${url.origin}${safePath(url.pathname)}`;
  } catch {
    return "";
  }
}
function pageContext() {
  const path = safePath(window.location.pathname);
  return {
    page_location: safePageURL(window.location.href),
    page_title: `Dream Key | ${routes[path] || (path.startsWith("/buy/") ? "Property details" : "Page not found")}`,
  };
}
export function analyticsAllowed(): boolean {
  return (
    typeof window !== "undefined" &&
    analyticsEnabled &&
    !hasPrivacySignal() &&
    getConsentSnapshot()?.analytics === true
  );
}
export function googleCommand(...args: unknown[]): void {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer ||= [];
    window.gtag ||= function () {
      // Google expects an Arguments entry, matching its official bootstrap.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag(...args);
  } catch {
    /* Analytics must never affect essential functionality. */
  }
}

const enums: Record<string, readonly string[]> = {
  form_name: ["contact_enquiry", "sell_enquiry"],
  enquiry_type: ["buy", "rent", "sell", "investment", "general"],
  transaction_type: ["buy", "rent"],
  inventory_source: ["live", "sample"],
  property_type: [
    "FLAT",
    "LAND",
    "WAREHOUSE",
    "COMMERCIAL",
    "OTHER",
    "apartment",
    "villa",
    "house",
    "penthouse",
    "duplex",
    "studio",
    "plot",
  ],
  service_name: [
    "buying",
    "renting",
    "selling",
    "investment_and_real_estate_consulting",
  ],
  interaction_type: ["submit", "filter_change", "sort_change", "reset"],
  filter_name: [
    "type",
    "budget",
    "bedrooms",
    "location",
    "maxPrice",
    "sort",
    "furnishing",
  ],
  item_list_name: ["buy_catalogue", "home_featured", "rent_catalogue"],
};
const safeTokens = new Set([
  "header",
  "footer",
  "floating_whatsapp",
  "property_details",
  "property_card",
  "home_gallery",
  "services",
  "contact",
  "buy_search",
  "buy_filters",
  "buy_sort",
  "rent_search",
  "rent_sort",
  "hero_search",
  "main_content",
  "navigation",
  "primary",
  "secondary",
  "hero",
  "property_management",
  "home_contact",
  "sell_primary",
  "page_cta",
]);
let serviceInterest: string | undefined;
const pendingEvents: unknown[][] = [];
const eventNames = new Set([
  "page_view",
  "cta_click",
  "form_start",
  "generate_lead",
  "whatsapp_click",
  "phone_click",
  "email_click",
  "property_search",
  "view_item_list",
  "select_item",
  "view_item",
  "property_enquiry_click",
  "service_interest",
]);
export function googleConfigured(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.dataLayer?.some((entry) => {
      const command = entry as { [key: number]: unknown };
      return command?.[0] === "config" && command?.[1] === GA_ID;
    })
  );
}
export function flushAnalyticsEvents(): void {
  if (!analyticsAllowed() || !googleConfigured()) return;
  for (const args of pendingEvents.splice(0)) googleCommand(...args);
}
/** Deliberately accepts only explicit, non-personal metadata. Never pass form values here. */
export function trackEvent(
  event: AnalyticsEvent,
  params: AnalyticsParams = {},
): boolean {
  if (!analyticsAllowed() || !eventNames.has(event)) return false;
  try {
    const clean: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined) continue;
      if (enums[key]?.includes(String(value))) clean[key] = value;
      else if (
        key === "property_id" &&
        typeof value === "string" &&
        (uuid.test(value) || /^sample-(buy|rent)-[a-z0-9-]{1,40}$/.test(value))
      )
        clean[key] = value;
      else if (key === "component_name" && safeTokens.has(String(value)))
        clean[key] = value;
      else if (
        key === "cta_name" &&
        typeof value === "string" &&
        /^(nav_(home|buy|rent|sell|services|about|contact|login|register|careers|privacy|terms-and-conditions)|category_(apartments_flats|independent_houses|villas|penthouses|duplex_homes|studio_apartments|residential_plots|commercial_properties)|contact|buy|sell|rent|services|enquire|search|back_to_website|hero_find_home|discuss_property|home_start_conversation|sell_primary|page_contact|outbound_link)$/.test(
          value,
        )
      )
        clean[key] = value;
      else if (
        key === "destination_domain" &&
        typeof value === "string" &&
        [
          "instagram.com",
          "youtube.com",
          "facebook.com",
          "linkedin.com",
          "google.com",
          "other",
        ].includes(value)
      )
        clean[key] = value;
      else if (key === "search_term_present" && typeof value === "boolean")
        clean[key] = value;
      else if (key === "destination_path" && typeof value === "string")
        clean[key] = safePath(value);
      else if (key === "page_referrer" && typeof value === "string")
        clean[key] = value === "" ? "" : safePageURL(value);
      else if (
        key === "filter_value" &&
        typeof value === "string" &&
        /^(FLAT|LAND|WAREHOUSE|COMMERCIAL|OTHER|[0-6]|[0-9]{1,9}|any|all|newest|price-asc|price-desc|area-desc|35-75|75-150|150-300|300-plus|new-town|ballygunge|alipore|rajarhat|em-bypass|salt-lake|central-kolkata|recommended|price-low|price-high|4\+|Furnished|Semi-furnished|Unfurnished|35l-75l|75l-1\.5cr|1\.5cr-3cr|3cr\+|[1-4]bhk|studio|apartment|penthouse|villa|under-1\.5|1\.5-2\.5|2\.5-4|above-4|[345]\+)$/.test(
          value,
        )
      )
        clean[key] = value;
    }
    if (event === "service_interest" && clean.service_name)
      serviceInterest = String(clean.service_name);
    if (event === "generate_lead" && serviceInterest)
      clean.service_name = serviceInterest;
    if (
      [
        "view_item_list",
        "select_item",
        "view_item",
        "property_enquiry_click",
      ].includes(event) &&
      clean.property_id
    ) {
      clean.items = [
        {
          item_id: clean.property_id,
          item_category: clean.property_type || "OTHER",
          item_list_name: clean.item_list_name,
        },
      ];
    }
    const args = [
      "event",
      event,
      {
        ...clean,
        ...pageContext(),
        send_to: GA_ID,
        ...(ANALYTICS_DEBUG ? { debug_mode: true } : {}),
      },
    ];
    // Only events created AFTER consent can wait briefly for the official init script.
    if (googleConfigured()) {
      if (event === "page_view") {
        googleCommand(...args);
        flushAnalyticsEvents();
      } else {
        flushAnalyticsEvents();
        googleCommand(...args);
      }
    } else if (pendingEvents.length < 50) pendingEvents.push(args);
    return true;
  } catch {
    return false;
  }
}

export function updateGoogleConsent(): boolean {
  const choice = getConsentSnapshot();
  const allowed = analyticsAllowed();
  if (typeof window === "undefined") return false;
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] =
    !allowed;
  googleCommand("consent", "update", {
    analytics_storage: allowed ? "granted" : "denied",
    ad_storage:
      allowed && choice?.advertising && !hasPrivacySignal()
        ? "granted"
        : "denied",
    ad_user_data:
      allowed && choice?.advertising && !hasPrivacySignal()
        ? "granted"
        : "denied",
    ad_personalization:
      allowed && choice?.advertising && !hasPrivacySignal()
        ? "granted"
        : "denied",
  });
  googleCommand("set", {
    allow_google_signals: false,
    allow_ad_personalization_signals: !!choice?.advertising && allowed,
  });
  if (!allowed) {
    lastPage = undefined;
    serviceInterest = undefined;
    pendingEvents.length = 0;
  }
  if (!allowed || !choice?.advertising) {
    // Remove only optional Google cookies; authentication/session cookies are untouched.
    const domains = window.location.hostname.split(".");
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0].trim();
      if (!/^(_ga($|_)|_gid$|_gat($|_)|_gcl_)/.test(name)) continue;
      if (allowed && !name.startsWith("_gcl_")) continue;
      document.cookie = `${name}=; Max-Age=0; path=/`;
      for (let i = 0; i < domains.length - 1; i++)
        document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domains.slice(i).join(".")}`;
    }
  }
  return allowed;
}

let lastPage: string | undefined;
export function trackPageView(pathname: string): void {
  if (!analyticsAllowed()) return;
  const path = safePath(pathname);
  if (lastPage === path) return;
  let referrer = lastPage ? `${window.location.origin}${lastPage}` : "";
  if (!lastPage && document.referrer) {
    try {
      const ref = new URL(document.referrer);
      referrer =
        ref.origin === window.location.origin
          ? safePageURL(ref.href)
          : ref.origin;
    } catch {
      /* No referrer. */
    }
  }
  googleCommand("set", { ...pageContext(), page_referrer: referrer });
  if (trackEvent("page_view", { page_referrer: referrer })) lastPage = path;
}
let prepared = false;
export function prepareGoogleTag(): void {
  if (prepared) return;
  prepared = true;
  googleCommand("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  googleCommand("set", {
    send_page_view: false,
    ...pageContext(),
    page_referrer: "",
    cookie_expires: 15_552_000,
    cookie_update: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    ads_data_redaction: true,
    url_passthrough: false,
  });
  updateGoogleConsent();
}
