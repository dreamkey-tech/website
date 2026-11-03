// Actual source exercised with a local DOM and fake Google tag. No Google/CRM requests.
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const Module = require("node:module");
const ts = require("typescript");
const root = process.cwd();
const jsdomDir = fs
  .readdirSync(path.join(require("node:os").homedir(), ".npm/_npx"))
  .map((p) =>
    path.join(
      require("node:os").homedir(),
      ".npm/_npx",
      p,
      "node_modules/jsdom",
    ),
  )
  .find((p) => fs.existsSync(path.join(p, "package.json")));
if (!jsdomDir)
  throw new Error(
    "Install jsdom in an isolated test-tools folder to run this harness.",
  );
const { JSDOM } = require(jsdomDir);
const dom = new JSDOM(
  '<!doctype html><html><body><div id="app"></div></body></html>',
  {
    url: "https://www.dreamkeykol.com/contact?q=person%40example.com&property=private-address#secret",
  },
);
Object.assign(global, {
  window: dom.window,
  document: dom.window.document,
  Element: dom.window.Element,
  HTMLElement: dom.window.HTMLElement,
  HTMLAnchorElement: dom.window.HTMLAnchorElement,
  HTMLFormElement: dom.window.HTMLFormElement,
  FormData: dom.window.FormData,
  MutationObserver: dom.window.MutationObserver,
  Event: dom.window.Event,
  IS_REACT_ACT_ENVIRONMENT: true,
});
Object.defineProperty(global, "navigator", {
  value: dom.window.navigator,
  configurable: true,
});
process.env.NEXT_PUBLIC_GA_ID = "G-2VBCFFSS0E";
process.env.NEXT_PUBLIC_ANALYTICS_DEBUG = "true";
const cache = new Map(),
  overrides = {};
function load(relative) {
  const file = path.resolve(root, relative);
  if (cache.has(file)) return cache.get(file);
  const m = new Module(file);
  m.filename = file;
  m.paths = Module._nodeModulePaths(path.dirname(file));
  m.require = (name) => {
    if (name in overrides) return overrides[name];
    if (name.endsWith(".css"))
      return {
        __esModule: true,
        default: new Proxy({}, { get: (_, key) => key }),
      };
    if (name.startsWith("@/") || name.startsWith(".")) {
      const base = name.startsWith("@/")
        ? path.join(root, name.slice(2))
        : path.resolve(path.dirname(file), name);
      for (const ext of [".ts", ".tsx"])
        if (fs.existsSync(base + ext)) return load(base + ext);
    }
    return Module.createRequire(file)(name);
  };
  m._compile(
    ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText,
    file,
  );
  cache.set(file, m.exports);
  return m.exports;
}
const React = require("react"),
  { act } = React,
  { createRoot } = require("react-dom/client");
const consent = load("lib/consent.ts"),
  analytics = load("lib/analytics.ts");
const commands = () => (window.dataLayer || []).map((x) => Array.from(x));
const events = (name) =>
  commands().filter((x) => x[0] === "event" && (!name || x[1] === name));
const checks = [];
function check(name, fn) {
  fn();
  checks.push(name);
}
let observation;
class IO {
  constructor(callback) {
    this.callback = callback;
    this.elements = new Set();
    observation = this;
  }
  observe(el) {
    this.elements.add(el);
  }
  unobserve(el) {
    this.elements.delete(el);
  }
  disconnect() {
    this.elements.clear();
  }
  visible() {
    this.callback(
      [...this.elements].map((target) => ({
        target,
        isIntersecting: true,
        intersectionRatio: 1,
      })),
    );
  }
}
global.IntersectionObserver = IO;
(async () => {
  check("SSR safe helpers do not require browser consent", () => {
    assert.equal(consent.getConsentSnapshot(), null);
    assert.equal(
      analytics.trackEvent("generate_lead", { fullName: "Private Person" }),
      false,
    );
  });
  analytics.prepareGoogleTag();
  analytics.prepareGoogleTag();
  check(
    "Four default denied signals precede configuration exactly once",
    () => {
      const defaults = commands().filter(
        (x) => x[0] === "consent" && x[1] === "default",
      );
      assert.equal(defaults.length, 1);
      assert.deepEqual(defaults[0][2], {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      assert.equal(commands().filter((x) => x[0] === "config").length, 0);
    },
  );
  const stop = consent.subscribeConsent(() => analytics.updateGoogleConsent());
  check("Reject persists and never queues business events", () => {
    consent.saveConsent({ analytics: false, advertising: false });
    assert.equal(JSON.parse(localStorageValue()).analytics, false);
    assert.equal(
      analytics.trackEvent("phone_click", { component_name: "footer" }),
      false,
    );
    assert.equal(events().length, 0);
  });
  consent.saveConsent({ analytics: true, advertising: false });
  analytics.trackEvent("cta_click", {
    component_name: "header",
    cta_name: "nav_buy",
  });
  check("Only post-consent events wait for Google init", () =>
    assert.equal(events().length, 0),
  );
  analytics.googleCommand("config", analytics.GA_ID);
  analytics.flushAnalyticsEvents();
  check(
    "Analytics-only consent grants no advertising signals and flushes once",
    () => {
      assert.equal(events("cta_click").length, 1);
      analytics.flushAnalyticsEvents();
      assert.equal(events("cta_click").length, 1);
      const update = commands()
        .filter((x) => x[0] === "consent" && x[1] === "update")
        .at(-1)[2];
      assert.equal(update.analytics_storage, "granted");
      assert.equal(update.ad_storage, "denied");
      assert.equal(update.ad_user_data, "denied");
      assert.equal(update.ad_personalization, "denied");
    },
  );
  analytics.trackPageView("/contact");
  analytics.trackPageView("/contact");
  check(
    "One initial page view; queries hashes and personal title absent",
    () => {
      assert.equal(events("page_view").length, 1);
      assert.equal(
        events("page_view")[0][2].page_location,
        "https://www.dreamkeykol.com/contact",
      );
      assert.equal(events("page_view")[0][2].page_title, "Dream Key | Contact");
    },
  );
  window.history.pushState({}, "", "/buy?email=secret@example.com");
  analytics.trackPageView("/buy");
  analytics.trackPageView("/buy?q=other");
  check(
    "SPA path navigation records once with sanitized previous route",
    () => {
      assert.equal(events("page_view").length, 2);
      assert.equal(
        events("page_view").at(-1)[2].page_referrer,
        "https://www.dreamkeykol.com/contact",
      );
    },
  );
  analytics.trackEvent("generate_lead", {
    form_name: "contact_enquiry",
    enquiry_type: "buy",
    email: "private@example.com",
    mobileNo: "9876543210",
    specificRequirements: "secret",
    page_location: "https://bad.example/private",
    property_id: "PRIVATE OWNER",
  });
  check(
    "Runtime allowlist drops identity, messages, arbitrary metadata and URL overrides",
    () => {
      const hit = events("generate_lead").at(-1)[2];
      assert.equal(hit.form_name, "contact_enquiry");
      assert.equal(hit.email, undefined);
      assert.equal(hit.property_id, undefined);
      assert.equal(hit.page_location, "https://www.dreamkeykol.com/buy");
      assert.ok(!JSON.stringify(hit).includes("secret"));
    },
  );
  document.cookie = "_ga=example; path=/";
  document.cookie = "essential-session=keep; path=/";
  consent.saveConsent({ analytics: false, advertising: false });
  check(
    "Revocation stops events and removes optional cookies, preserving session",
    () => {
      const count = events().length;
      assert.equal(analytics.trackEvent("email_click"), false);
      assert.equal(events().length, count);
      assert.equal(window["ga-disable-G-2VBCFFSS0E"], true);
      assert.ok(!document.cookie.includes("_ga="));
      assert.ok(document.cookie.includes("essential-session=keep"));
    },
  );
  Object.defineProperty(navigator, "globalPrivacyControl", {
    value: true,
    configurable: true,
  });
  consent.saveConsent({ analytics: true, advertising: true });
  check("GPC overrides attempted grants", () =>
    assert.deepEqual(
      [
        consent.getConsentSnapshot().analytics,
        consent.getConsentSnapshot().advertising,
      ],
      [false, false],
    ),
  );
  Object.defineProperty(navigator, "globalPrivacyControl", {
    value: false,
    configurable: true,
  });
  Object.defineProperty(navigator, "doNotTrack", {
    value: "1",
    configurable: true,
  });
  consent.saveConsent({ analytics: true, advertising: true });
  check("DNT overrides attempted grants", () =>
    assert.equal(analytics.analyticsAllowed(), false),
  );
  Object.defineProperty(navigator, "doNotTrack", {
    value: "0",
    configurable: true,
  });
  window.localStorage.setItem(
    consent.CONSENT_STORAGE_KEY,
    JSON.stringify({
      version: 1,
      analytics: true,
      advertising: true,
      updatedAt: Date.now() - consent.CONSENT_MAX_AGE - 1,
    }),
  );
  check("Expired preferences return to no optional permission", () =>
    assert.equal(consent.getConsentSnapshot(), null),
  );
  consent.saveConsent({ analytics: true, advertising: false });
  const identity = consent.getConsentSnapshot();
  check("Stable snapshots and storage changes synchronize across tabs", () => {
    assert.equal(identity, consent.getConsentSnapshot());
    window.localStorage.setItem(
      consent.CONSENT_STORAGE_KEY,
      JSON.stringify({ ...identity, analytics: false }),
    );
    window.dispatchEvent(
      new window.StorageEvent("storage", { key: consent.CONSENT_STORAGE_KEY }),
    );
    assert.equal(analytics.analyticsAllowed(), false);
  });
  const originalSetItem = window.Storage.prototype.setItem;
  window.Storage.prototype.setItem = function () {
    throw new Error("Blocked write");
  };
  consent.saveConsent({ analytics: true, advertising: false });
  check("Writable-storage failure retains the fresh choice in memory", () =>
    assert.equal(consent.getConsentSnapshot().analytics, true),
  );
  window.Storage.prototype.setItem = originalSetItem;
  consent.saveConsent({ analytics: true, advertising: false });
  overrides["@/lib/analytics"] = analytics;
  const Tracking = load("components/analytics/InteractionTracking.tsx").default;
  const ui = createRoot(document.getElementById("app"));
  await act(async () =>
    ui.render(
      React.createElement(
        React.StrictMode,
        null,
        React.createElement(Tracking, { pathname: "/buy", allowed: true }),
      ),
    ),
  );
  document.body.insertAdjacentHTML(
    "beforeend",
    `<footer><a id="phone" href="tel:+917980133881">Call</a><a id="email" href="mailto:info@dreamkeykol.com">Email</a><a id="social" href="https://www.facebook.com/profile.php?id=private-person&email=secret@example.com">Social</a><a id="wa" href="https://api.whatsapp.com/send?phone=917980133881&text=Private%20Message">WA</a></footer><article data-property-id="12345678-1234-1234-1234-123456789abc" data-property-type="FLAT" data-transaction-type="buy" data-inventory-source="live" data-list-name="buy_catalogue" data-analytics-impression="list"><a id="property" href="/buy/12345678-1234-1234-1234-123456789abc" data-analytics-event="select_item" data-component-name="property_card">Property</a></article>`,
  );
  document.addEventListener("click", (e) => e.preventDefault());
  await act(async () => {
    for (const id of ["phone", "email", "wa", "property", "social"])
      document.getElementById(id).click();
  });
  check(
    "Delegated contact/property events have one event each, no destination PII",
    () => {
      assert.equal(events("phone_click").length, 1);
      assert.equal(events("email_click").length, 1);
      assert.equal(events("whatsapp_click").length, 1);
      assert.equal(events("select_item").length, 1);
      assert.equal(events("select_item")[0][2].component_name, "property_card");
      assert.ok(!JSON.stringify(events()).includes("917980133881"));
      assert.ok(!JSON.stringify(events()).includes("Private Message"));
    },
  );
  check("Outbound links retain only a safe destination category", () => {
    const hit = events("cta_click").find(
      (x) => x[2].cta_name === "outbound_link",
    );
    assert.ok(hit);
    assert.equal(hit[2].destination_domain, "facebook.com");
    assert.ok(!JSON.stringify(hit).includes("private-person"));
    assert.ok(!JSON.stringify(hit).includes("secret@example.com"));
  });
  await act(async () => {
    observation.visible();
    observation.visible();
  });
  check("Visible property impression dedupes repeated observer callbacks", () =>
    assert.equal(events("view_item_list").length, 1),
  );
  await act(async () => ui.unmount());
  stop();
  const result = {
    passed: checks.length,
    checks,
    scope:
      "Actual consent/store/tracker source with local DOM, simulated visibility, fake gtag config; no live Google or CRM traffic.",
  };
  fs.writeFileSync(
    "output/analytics/verification.json",
    JSON.stringify(result, null, 2) + "\n",
  );
  console.log(JSON.stringify(result, null, 2));
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
  process.exit(1);
});
function localStorageValue() {
  return window.localStorage.getItem(consent.CONSENT_STORAGE_KEY);
}
