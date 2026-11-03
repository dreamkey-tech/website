// Actual loading/access components with isolated Next navigation and no requests.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const cache = path.join(require("node:os").homedir(), ".npm/_npx");
const jsdom =
  process.env.DREAMKEY_JSDOM_MODULE ||
  fs
    .readdirSync(cache)
    .map((entry) => path.join(cache, entry, "node_modules/jsdom"))
    .find((entry) => fs.existsSync(path.join(entry, "package.json")));
assert.ok(jsdom, "Use the existing isolated jsdom installation");
const { JSDOM, VirtualConsole } = require(jsdom);
const virtualConsole = new VirtualConsole();
virtualConsole.on("jsdomError", (error) => {
  // The modifier-click test preserves native navigation; jsdom cannot follow it.
  if (!error.message.includes("Not implemented: navigation")) throw error;
});
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "https://local-fixture.example/buy",
  pretendToBeVisual: true,
  virtualConsole,
});
Object.assign(global, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  IS_REACT_ACT_ENVIRONMENT: true,
  requestAnimationFrame: dom.window.requestAnimationFrame.bind(dom.window),
  cancelAnimationFrame: dom.window.cancelAnimationFrame.bind(dom.window),
});
window.HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute("open", "");
};
window.HTMLDialogElement.prototype.close = function () {
  this.removeAttribute("open");
  this.dispatchEvent(new window.Event("close"));
};
const React = require("react");
const { act } = React;
const { createRoot } = require("react-dom/client");
const { renderToStaticMarkup } = require("react-dom/server");
const LinkContext = React.createContext({ pending: false });
const modules = new Map();
const navigation = [];
const checks = [];
let authenticated = true;
let pending = false;
let pushRoute = () => {};
let networkRequests = 0;
const deniedFetch = () => {
  networkRequests++;
  throw new Error("The loading harness must not make requests");
};
const previousFetch = global.fetch;
global.fetch = window.fetch = deniedFetch;
const router = {
  push: (href) => {
    navigation.push(["push", href]);
    pushRoute(href);
  },
  refresh: () => navigation.push(["refresh"]),
};
const mocks = {
  "next/navigation": { useRouter: () => router },
  "next/link": {
    __esModule: true,
    useLinkStatus: () => React.useContext(LinkContext),
    default: ({ children, prefetch, ...props }) =>
      React.createElement(
        LinkContext.Provider,
        { value: { pending } },
        React.createElement("a", props, children),
      ),
  },
  "next/image": {
    __esModule: true,
    default: ({ fill, fetchPriority, ...props }) =>
      React.createElement("img", props),
  },
  "@phosphor-icons/react": new Proxy(
    {},
    { get: () => () => React.createElement("svg", { "aria-hidden": true }) },
  ),
  "@/store/authStore": {
    useAuthStore: (selector) =>
      selector({ isAuthenticated: authenticated, isLoading: false }),
  },
  "@/components/auth/AuthForm": {
    __esModule: true,
    default: ({ onAuthenticated, returnTo }) =>
      React.createElement(
        "button",
        {
          type: "button",
          onClick: onAuthenticated,
          "data-return-to": returnTo,
        },
        "Complete verified OTP",
      ),
  },
};
function load(file) {
  file = path.resolve(file);
  if (modules.has(file)) return modules.get(file).exports;
  const module = { exports: {} };
  modules.set(file, module);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const localRequire = (name) => {
    if (name in mocks) return mocks[name];
    if (name.endsWith(".module.css"))
      return {
        __esModule: true,
        default: new Proxy({}, { get: (_, key) => key }),
      };
    if (name.startsWith("@/") || name.startsWith(".")) {
      const base = name.startsWith("@/")
        ? path.resolve(name.slice(2))
        : path.resolve(path.dirname(file), name);
      return load(
        [".ts", ".tsx", ""].map((ext) => base + ext).find(fs.existsSync),
      );
    }
    return require(name);
  };
  new Function("require", "module", "exports", code)(
    localRequire,
    module,
    module.exports,
  );
  return module.exports;
}
const PageLoading = load("components/navigation/PageLoading.tsx").default;
const PropertyLoading = load("app/buy/[slug]/loading.tsx").default;
const Provider = load("components/property/PropertyAccessProvider.tsx").default;
const PropertyLink = load("components/property/PropertyLink.tsx").default;
const propertyHref = "/buy/10000000-0000-4000-8000-000000000001";
async function mount(element) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = createRoot(host);
  await act(async () => root.render(element));
  return {
    host,
    render: async (next) => act(async () => root.render(next)),
    close: async () => {
      await act(async () => root.unmount());
      host.remove();
    },
  };
}
const linkTree = () =>
  React.createElement(
    Provider,
    null,
    React.createElement(PropertyLink, { href: propertyHref }, "View listing"),
  );
function assertNoLoader() {
  assert.equal(document.querySelector('[role="status"]'), null);
}
(async () => {
  const defaultMarkup = renderToStaticMarkup(React.createElement(PageLoading));
  assert.ok(defaultMarkup.includes("Loading your page…"));
  const listingMarkup = renderToStaticMarkup(
    React.createElement(PropertyLoading),
  );
  assert.ok(listingMarkup.includes("Opening property…"));
  assert.ok(listingMarkup.includes('role="status"'));
  assert.ok(listingMarkup.includes('aria-live="polite"'));
  assert.ok(listingMarkup.includes("/logo.webp"));
  checks.push(
    "shared and detail-boundary SSR preserve brand, default/custom labels and polite loading status",
  );

  const ui = await mount(linkTree());
  assertNoLoader();
  pending = true;
  await ui.render(linkTree());
  const status = document.querySelector('[role="status"]');
  assert.ok(status);
  assert.equal(
    status.parentElement,
    document.body,
    "Link feedback is portalled outside all card clipping",
  );
  assert.equal(
    document.querySelector("a").querySelector('[role="status"]'),
    null,
  );
  assert.ok(status.textContent.includes("Opening property…"));
  assert.equal(document.querySelector("a").textContent, "View listing");
  pending = false;
  await ui.render(linkTree());
  assertNoLoader();
  pending = true;
  await ui.render(linkTree());
  assert.ok(document.querySelector('[role="status"]'));
  await ui.close();
  assertNoLoader();
  checks.push(
    "Link-owned pending state alone mounts/removes a body portal without altering the anchor label; unmount cleans up",
  );

  authenticated = false;
  pending = false;
  const anonymousUI = await mount(linkTree());
  const anchor = document.querySelector("a");
  const modified = new window.MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    ctrlKey: true,
  });
  await act(async () => anchor.dispatchEvent(modified));
  assert.equal(modified.defaultPrevented, false);
  assert.equal(document.querySelector("dialog"), null);
  assertNoLoader();
  const ordinary = new window.MouseEvent("click", {
    bubbles: true,
    cancelable: true,
  });
  await act(async () => anchor.dispatchEvent(ordinary));
  assert.equal(ordinary.defaultPrevented, true);
  assert.ok(document.querySelector("dialog[open]"));
  assertNoLoader();
  await act(async () =>
    document.querySelector('[aria-label="Close login popup"]').click(),
  );
  assert.equal(document.querySelector("dialog"), null);
  assert.equal(document.body.style.overflow, "");
  await anonymousUI.close();
  checks.push(
    "anonymous clicks keep the login modal; cancelling and modified clicks never invent a navigation loader",
  );

  let ready = false;
  let release;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  function RouteSlot() {
    const [requested, setRequested] = React.useState(false);
    pushRoute = () => setRequested(true);
    if (requested && !ready) throw gate;
    return requested
      ? React.createElement("p", null, "Detail route complete")
      : React.createElement(
          PropertyLink,
          { href: propertyHref },
          "View listing",
        );
  }
  const transitionUI = await mount(
    React.createElement(
      Provider,
      null,
      React.createElement(
        React.Suspense,
        { fallback: "Route fallback" },
        React.createElement(RouteSlot),
      ),
    ),
  );
  await act(async () => document.querySelector("a").click());
  assert.ok(document.querySelector("dialog[open]"));
  await act(async () =>
    [...document.querySelectorAll("button")]
      .find((button) => button.textContent === "Complete verified OTP")
      .click(),
  );
  assert.equal(document.querySelector("dialog"), null);
  assert.equal(document.body.style.overflow, "");
  assert.deepEqual(navigation, [["push", propertyHref], ["refresh"]]);
  assert.ok(
    document
      .querySelector('[role="status"]')
      ?.textContent.includes("Opening property…"),
  );
  await act(async () => {
    ready = true;
    release();
    await gate;
  });
  assert.ok(document.body.textContent.includes("Detail route complete"));
  assertNoLoader();
  await transitionUI.close();
  checks.push(
    "verified-auth callback closes the modal, retains push/refresh, shows feedback through an actual suspended React transition and clears it on completion",
  );
  assert.equal(networkRequests, 0);
  const result = {
    passed: checks.length,
    checks,
    scope:
      "Actual source components in React/jsdom with isolated Link/router/auth adapters. No live APIs, CRM activity or production requests. Native Next history/error timing and visual rendering require separate browser checks.",
  };
  fs.writeFileSync(
    "output/navigation-loading/property-loading-verification.json",
    JSON.stringify(result, null, 2) + "\n",
  );
  console.log(JSON.stringify(result, null, 2));
})()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    global.fetch = previousFetch;
    dom.window.close();
  });
