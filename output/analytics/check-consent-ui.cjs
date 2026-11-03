const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { createRequire } = require("node:module");
const root = process.cwd();
const req = createRequire(path.join(root, "package.json"));
const cache = path.join(require("node:os").homedir(), ".npm/_npx");
const jsdomPath = fs
  .readdirSync(cache)
  .map((p) => path.join(cache, p, "node_modules/jsdom"))
  .find((p) => fs.existsSync(path.join(p, "package.json")));
const { JSDOM } = require(jsdomPath);
const dom = new JSDOM(
  "<!doctype html><html><body><main><button id='opener'>Footer preferences</button></main><div id='app'></div></body></html>",
  { url: "http://localhost/" },
);
Object.assign(global, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  IS_REACT_ACT_ENVIRONMENT: true,
});
Object.defineProperty(global, "navigator", {
  value: dom.window.navigator,
  configurable: true,
});
window.HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute("open", "");
};
window.HTMLDialogElement.prototype.close = function () {
  this.removeAttribute("open");
  this.dispatchEvent(new window.Event("close"));
};
const React = req("react"),
  { act } = React;
const { createRoot } = req("react-dom/client");
const { renderToString } = req("react-dom/server");
const ts = req("typescript");
let saved = null;
const calls = [],
  listeners = new Set();
const consent = {
  getConsentSnapshot: () => saved,
  hasPrivacySignal: () =>
    navigator.globalPrivacyControl === true || navigator.doNotTrack === "1",
  subscribeConsent: (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  saveConsent: (next) => {
    calls.push(next);
    saved = { version: 1, updatedAt: Date.now(), ...next };
    listeners.forEach((fn) => fn());
  },
  openCookiePreferences: () =>
    window.dispatchEvent(new window.Event("dreamkey:cookie-preferences")),
  PREFERENCES_OPEN_EVENT: "dreamkey:cookie-preferences",
};
const mocks = {
  "@/lib/consent": consent,
  "next/link": {
    __esModule: true,
    default: ({ children, ...props }) =>
      React.createElement("a", props, children),
  },
  "@phosphor-icons/react": {
    X: () => React.createElement("svg", { "aria-hidden": true }),
  },
};
function load(file) {
  const mod = { exports: {} };
  const output = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  new Function("require", "module", "exports", output)(
    (name) =>
      name in mocks
        ? mocks[name]
        : name.endsWith(".module.css")
          ? {
              __esModule: true,
              default: new Proxy({}, { get: (_, key) => key }),
            }
          : req(name),
    mod,
    mod.exports,
  );
  return mod.exports;
}
const CookieConsent = load(
  path.join(root, "components/analytics/CookieConsent.tsx"),
).default;
const CookiePreferencesButton = load(
  path.join(root, "components/analytics/CookiePreferencesButton.tsx"),
).default;
const uiRoot = createRoot(document.getElementById("app"));
const checks = [];
const button = (container, label) =>
  [...container.querySelectorAll("button")].find(
    (element) => element.textContent === label,
  );
const click = async (element) => {
  assert.ok(element, "click target exists");
  await act(async () => element.click());
};
const setSaved = async (value) => {
  await act(async () => {
    saved = value;
    listeners.forEach((fn) => fn());
  });
};
(async () => {
  assert.match(
    renderToString(React.createElement(CookieConsent)),
    /Your privacy, your choice/,
  );
  checks.push("Server snapshot is null and renders neutral initial choices");
  await act(async () =>
    uiRoot.render(
      React.createElement(
        React.Fragment,
        null,
        React.createElement(CookieConsent),
        React.createElement(CookiePreferencesButton),
      ),
    ),
  );
  let banner = document.querySelector("[data-cookie-consent-banner]");
  assert.equal(banner.querySelectorAll("button").length, 3);
  assert.equal(calls.length, 0);
  checks.push(
    "Initial banner offers three choices without recording permission",
  );
  await click(button(banner, "Cookie preferences"));
  const dialog = document.querySelector("dialog");
  assert.ok(dialog.open);
  const essential = dialog.querySelector("input[aria-label^='Essential']");
  const analytics = dialog.querySelector(
    "input[aria-label='Allow analytics cookies']",
  );
  const advertising = dialog.querySelector(
    "input[aria-label='Allow advertising cookies']",
  );
  assert.ok(essential.checked && essential.disabled);
  assert.ok(!analytics.checked && !advertising.checked);
  checks.push(
    "Preferences open with essential available and optional categories off",
  );
  await click(analytics);
  await click(button(dialog, "Save preferences"));
  assert.deepEqual(calls.at(-1), { analytics: true, advertising: false });
  assert.equal(dialog.open, false);
  assert.equal(document.querySelector("[data-cookie-consent-banner]"), null);
  checks.push("Saving analytics-only permission closes banner and dialog");
  const opener = document.getElementById("opener");
  opener.focus();
  await act(async () => consent.openCookiePreferences());
  assert.ok(dialog.open && analytics.checked && !advertising.checked);
  await click(
    dialog.querySelector("button[aria-label='Close cookie preferences']"),
  );
  assert.equal(document.activeElement, opener);
  assert.equal(calls.length, 1);
  checks.push(
    "Later reopen restores choices and close returns focus without saving",
  );
  await act(async () => consent.openCookiePreferences());
  await click(button(dialog, "Accept all"));
  assert.deepEqual(calls.at(-1), { analytics: true, advertising: true });
  checks.push("Accept all grants both optional categories");
  await act(async () => consent.openCookiePreferences());
  await click(button(dialog, "Reject optional"));
  assert.deepEqual(calls.at(-1), { analytics: false, advertising: false });
  checks.push("Reject optional revokes both categories");
  await setSaved(null);
  banner = document.querySelector("[data-cookie-consent-banner]");
  assert.ok(banner);
  Object.defineProperty(navigator, "globalPrivacyControl", {
    value: true,
    configurable: true,
  });
  await act(async () => consent.openCookiePreferences());
  assert.ok(analytics.disabled && advertising.disabled);
  assert.match(dialog.textContent, /Global Privacy Control/);
  await click(button(dialog, "Accept all"));
  assert.deepEqual(calls.at(-1), { analytics: false, advertising: false });
  checks.push(
    "Browser privacy signal disables optional toggles and blocks grants",
  );
  await act(async () => uiRoot.unmount());
  assert.equal(listeners.size, 0);
  assert.equal(
    document.documentElement.style.getPropertyValue(
      "--dreamkey-consent-banner-height",
    ),
    "",
  );
  checks.push(
    "Unmount cleans store subscription and page reservation variable",
  );
  console.log(
    JSON.stringify(
      {
        passed: checks.length,
        checks,
        scope:
          "Actual consent UI source in jsdom with isolated preference-store adapter; no browser geometry or live Google requests",
      },
      null,
      2,
    ),
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
