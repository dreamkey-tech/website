/** First-party preference storage only; never stores identity or form data. */
export type ConsentPreferences = {
  version: 1;
  analytics: boolean;
  advertising: boolean;
  updatedAt: number;
};
export const CONSENT_STORAGE_KEY = "dreamkey:consent:v1";
export const PREFERENCES_OPEN_EVENT = "dreamkey:cookie-preferences";
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
const listeners = new Set<() => void>();
let snapshot: ConsentPreferences | null = null;
let loaded = false;
let lastRaw: string | null = null;
let listening = false;
let sessionOnly = false;
let expiry: ReturnType<typeof setTimeout> | undefined;

export function hasPrivacySignal(): boolean {
  if (typeof navigator === "undefined") return false;
  return (
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true ||
    navigator.doNotTrack === "1" ||
    navigator.doNotTrack === "yes"
  );
}

function parse(raw: string | null): ConsentPreferences | null {
  try {
    const value = JSON.parse(raw || "null");
    if (
      !value ||
      value.version !== 1 ||
      typeof value.analytics !== "boolean" ||
      typeof value.advertising !== "boolean" ||
      typeof value.updatedAt !== "number" ||
      !Number.isFinite(value.updatedAt) ||
      value.updatedAt > Date.now() ||
      Date.now() - value.updatedAt >= CONSENT_MAX_AGE
    )
      return null;
    return value;
  } catch {
    return null;
  }
}

export function getConsentSnapshot(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionOnly
      ? lastRaw
      : window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!loaded || raw !== lastRaw) {
      lastRaw = raw;
      snapshot = parse(raw);
      loaded = true;
    }
  } catch {
    loaded = true; /* Session-only choice when storage is unavailable. */
  }
  if (snapshot && Date.now() - snapshot.updatedAt >= CONSENT_MAX_AGE)
    snapshot = null;
  if (
    snapshot &&
    hasPrivacySignal() &&
    (snapshot.analytics || snapshot.advertising)
  ) {
    snapshot = { ...snapshot, analytics: false, advertising: false };
  }
  return snapshot;
}

function notify() {
  getConsentSnapshot();
  listeners.forEach((listener) => listener());
  clearTimeout(expiry);
  if (snapshot)
    expiry = setTimeout(
      notify,
      Math.min(
        2_147_483_647,
        Math.max(1, snapshot.updatedAt + CONSENT_MAX_AGE - Date.now()),
      ),
    );
}

function handleStorage(event: StorageEvent) {
  if (event.key === CONSENT_STORAGE_KEY || event.key === null) {
    sessionOnly = false;
    notify();
  }
}
export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  if (typeof window !== "undefined" && !listening) {
    listening = true;
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", notify);
  }
  notify();
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      clearTimeout(expiry);
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener("focus", notify);
      }
      listening = false;
    }
  };
}

export function saveConsent(choice: {
  analytics: boolean;
  advertising: boolean;
}): void {
  if (typeof window === "undefined") return;
  snapshot = {
    version: 1,
    analytics: !hasPrivacySignal() && !!choice.analytics,
    advertising: !hasPrivacySignal() && !!choice.advertising,
    updatedAt: Date.now(),
  };
  loaded = true;
  lastRaw = JSON.stringify(snapshot);
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, lastRaw);
  } catch {
    sessionOnly = true; /* In memory fallback when reads work but writes fail. */
  }
  notify();
}

export function openCookiePreferences(): void {
  if (typeof window !== "undefined")
    window.dispatchEvent(new Event(PREFERENCES_OPEN_EVENT));
}
