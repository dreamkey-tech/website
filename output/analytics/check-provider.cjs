// Real provider, consent UI/store, tracker and official GA bootstrap with a cached
// Next Script adapter. Browser visibility and Vercel transport are isolated; no requests.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
const root = process.cwd();
const npxCache = path.join(require("node:os").homedir(), ".npm/_npx");
const jsdomPath =
  process.env.DREAMKEY_JSDOM_MODULE ||
  fs
    .readdirSync(npxCache)
    .map((entry) => path.join(npxCache, entry, "node_modules/jsdom"))
    .find((entry) => fs.existsSync(path.join(entry, "package.json")));
if (!jsdomPath)
  throw new Error("Use an isolated jsdom test installation for this harness.");
const { JSDOM, VirtualConsole } = require(jsdomPath);
process.env.NODE_ENV = "test";
process.env.NEXT_PUBLIC_GA_ID = "G-2VBCFFSS0E";
process.env.NEXT_PUBLIC_ANALYTICS_DEBUG = "true";
const React = require("react");
const { act } = React;
const { createRoot } = require("react-dom/client");
const checks = [];
const pause = () => new Promise((resolve) => setTimeout(resolve, 70));
const propertyID = "10000000-0000-4000-8000-000000000001";

function environment(storedChoice) {
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("jsdomError", (error) => {
    throw error;
  });
  const dom = new JSDOM(
    "<!doctype html><html><body><div id='app'></div></body></html>",
    {
      url: "https://www.dreamkeykol.com/?q=private%40example.com#private",
      runScripts: "outside-only",
      pretendToBeVisual: true,
      virtualConsole,
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
  dom.window.HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  dom.window.HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
    this.dispatchEvent(new dom.window.Event("close"));
  };
  let requests = 0;
  const deniedFetch = () => {
    requests++;
    throw new Error("The integration harness must not make external requests.");
  };
  window.fetch = deniedFetch;
  const nativeFetch = global.fetch;
  global.fetch = deniedFetch;
  if (storedChoice)
    window.localStorage.setItem("dreamkey:consent:v1", storedChoice);
  const observers = new Set();
  const observationLog = [];
  global.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback;
      this.elements = new Set();
      observers.add(this);
    }
    observe(element) {
      observationLog.push({
        operation: "observe",
        id: element.dataset.propertyId,
      });
      this.elements.add(element);
    }
    unobserve(element) {
      observationLog.push({
        operation: "unobserve",
        id: element.dataset.propertyId,
      });
      this.elements.delete(element);
    }
    disconnect() {
      this.elements.clear();
      observers.delete(this);
    }
  };
  const scriptIDs = new Set();
  const executedScripts = [];
  const tagSources = [];
  let pathname = "/";
  let vercelBeforeSend;
  function Script(props) {
    React.useEffect(() => {
      // Next Script caches by id/src. StrictMode effect replay must not execute
      // bootstrap again; using a naive effect would invent a duplicate config.
      const identity = props.id || props.src;
      if (scriptIDs.has(identity)) return;
      scriptIDs.add(identity);
      if (props.dangerouslySetInnerHTML?.__html) {
        executedScripts.push(identity);
        window.eval(props.dangerouslySetInnerHTML.__html);
      }
      if (props.src) tagSources.push(props.src);
    }, [props.id, props.src, props.dangerouslySetInnerHTML?.__html]);
    return null;
  }
  const mocks = {
    "next/navigation": { usePathname: () => pathname },
    "next/script": { __esModule: true, default: Script },
    "next/link": {
      __esModule: true,
      default: ({ children, ...props }) =>
        React.createElement("a", props, children),
    },
    "@vercel/analytics/react": {
      Analytics: ({ beforeSend }) => {
        vercelBeforeSend = beforeSend;
        return React.createElement("span", {
          "data-vercel-analytics": "",
          hidden: true,
        });
      },
    },
    "@phosphor-icons/react": new Proxy(
      {},
      { get: () => () => React.createElement("svg", { "aria-hidden": true }) },
    ),
  };
  const modules = new Map();
  function load(relative) {
    const file = path.resolve(root, relative);
    if (modules.has(file)) return modules.get(file).exports;
    const mod = new Module(file);
    mod.filename = file;
    mod.paths = Module._nodeModulePaths(path.dirname(file));
    modules.set(file, mod);
    mod.require = (name) => {
      if (name in mocks) return mocks[name];
      if (name.endsWith(".css"))
        return {
          __esModule: true,
          default: new Proxy({}, { get: (_, key) => key }),
        };
      if (name === "@next/third-parties/google")
        return {
          GoogleAnalytics: load(
            "node_modules/@next/third-parties/dist/google/ga.js",
          ).GoogleAnalytics,
        };
      if (name.startsWith("@/") || name.startsWith(".")) {
        const base = name.startsWith("@/")
          ? path.join(root, name.slice(2))
          : path.resolve(path.dirname(file), name);
        const candidate = [".ts", ".tsx", ".js", ""]
          .map((extension) => base + extension)
          .find((entry) => fs.existsSync(entry) && fs.statSync(entry).isFile());
        if (candidate) return load(candidate);
      }
      return Module.createRequire(file)(name);
    };
    mod._compile(
      ts.transpileModule(fs.readFileSync(file, "utf8"), {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          jsx: ts.JsxEmit.ReactJSX,
          esModuleInterop: true,
          target: ts.ScriptTarget.ES2022,
        },
      }).outputText,
      file,
    );
    return mod.exports;
  }
  const Provider = load("components/analytics/AnalyticsProvider.tsx").default;
  const consent = load("lib/consent.ts");
  const analytics = load("lib/analytics.ts");
  const ui = createRoot(document.getElementById("app"));
  const commands = () =>
    (window.dataLayer || []).map((entry) => Array.from(entry));
  const events = (name) =>
    commands().filter(
      (command) => command[0] === "event" && (!name || command[1] === name),
    );
  const configs = () => commands().filter((command) => command[0] === "config");
  async function render(revision = 0) {
    await act(async () =>
      ui.render(
        React.createElement(
          React.StrictMode,
          null,
          React.createElement(Provider, { key: "analytics" }),
          React.createElement(
            "main",
            { key: "content", "data-revision": revision },
            React.createElement(
              "article",
              {
                key: "property",
                "data-property-id": propertyID,
                "data-property-type": "FLAT",
                "data-transaction-type": "buy",
                "data-inventory-source": "live",
                "data-list-name": "buy_catalogue",
                "data-analytics-impression": "list",
              },
              "Visible property",
            ),
            ...Array.from({ length: revision }, (_, index) =>
              React.createElement(
                "p",
                { key: index },
                `Additional node ${index}`,
              ),
            ),
          ),
        ),
      ),
    );
    await act(pause);
  }
  async function chooseBanner(label) {
    await act(async () => {
      const button = [
        ...document.querySelectorAll("[data-cookie-consent-banner] button"),
      ].find((element) => element.textContent === label);
      assert.ok(button, `Missing banner action ${label}`);
      button.click();
    });
    await act(pause);
  }
  async function choosePreferences(label) {
    await act(async () => consent.openCookiePreferences());
    assert.ok(document.querySelector("dialog").open, "Preferences are open");
    await act(async () => {
      const button = [...document.querySelectorAll("dialog button")].find(
        (element) => element.textContent === label,
      );
      assert.ok(button, `Missing preferences action ${label}`);
      button.click();
    });
    await act(pause);
  }
  async function visible() {
    await act(async () => {
      for (const observer of observers)
        observer.callback(
          [...observer.elements]
            .filter((element) => element.isConnected)
            .map((target) => ({
              target,
              isIntersecting: true,
              intersectionRatio: 1,
            })),
        );
    });
  }
  return {
    render,
    chooseBanner,
    choosePreferences,
    visible,
    commands,
    configs,
    events,
    executedScripts,
    tagSources,
    observationLog,
    analytics,
    consent,
    get vercelBeforeSend() {
      return vercelBeforeSend;
    },
    get requests() {
      return requests;
    },
    async navigate(next, revision = 0) {
      pathname = next;
      window.history.pushState(
        {},
        "",
        next + "?q=private%40example.com#private",
      );
      await render(revision);
    },
    async staleVisibility(target) {
      await act(async () => {
        for (const observer of observers)
          observer.callback([
            { target, isIntersecting: true, intersectionRatio: 1 },
          ]);
      });
    },
    async close() {
      await act(async () => ui.unmount());
      dom.window.close();
      global.fetch = nativeFetch;
    },
  };
}

async function main() {
  let app = environment();
  try {
    await app.render();
    assert.equal(app.configs().length, 0);
    assert.equal(app.tagSources.length, 0);
    assert.equal(app.events().length, 0);
    assert.equal(
      document.querySelectorAll("[data-vercel-analytics]").length,
      0,
    );
    assert.equal(
      app
        .commands()
        .filter(
          (command) => command[0] === "consent" && command[1] === "default",
        ).length,
      1,
    );
    checks.push(
      "Initial StrictMode mount queues default-denied consent once and loads no Google/Vercel tag",
    );

    await app.chooseBanner("Reject optional");
    assert.equal(app.configs().length, 0);
    assert.equal(app.tagSources.length, 0);
    assert.equal(app.events().length, 0);
    assert.equal(
      app.analytics.trackEvent("phone_click", { component_name: "footer" }),
      false,
    );
    checks.push(
      "Rejecting optional cookies persists denial without tag, config or events",
    );

    await app.choosePreferences("Accept all");
    assert.equal(app.configs().length, 1);
    assert.equal(app.executedScripts.length, 1);
    assert.equal(app.tagSources.length, 1);
    assert.equal(app.events("page_view").length, 1);
    assert.equal(
      app.events("page_view")[0][2].page_location,
      "https://www.dreamkeykol.com/",
    );
    assert.equal(
      document.querySelectorAll("[data-vercel-analytics]").length,
      1,
    );
    assert.equal(
      app.vercelBeforeSend({
        type: "pageview",
        url: "https://www.dreamkeykol.com/contact?email=private@example.com#private",
      }).url,
      "https://www.dreamkeykol.com/contact",
    );
    const configIndex = app
      .commands()
      .findIndex((command) => command[0] === "config");
    assert.ok(
      app
        .commands()
        .slice(0, configIndex)
        .some(
          (command) =>
            command[0] === "set" && command[1].send_page_view === false,
        ),
    );
    assert.ok(
      app
        .commands()
        .slice(0, configIndex)
        .some(
          (command) => command[0] === "consent" && command[1] === "default",
        ),
    );
    checks.push(
      "Accepting uses the official bootstrap once under StrictMode, after safe/default-denied setup, with one manual pageview",
    );

    await app.navigate("/buy", 1);
    assert.equal(app.events("page_view").length, 2);
    assert.equal(
      app.events("page_view").at(-1)[2].page_location,
      "https://www.dreamkeykol.com/buy",
    );
    assert.equal(
      app.events("page_view").at(-1)[2].page_referrer,
      "https://www.dreamkeykol.com/",
    );
    await app.render(2);
    await app.render(3);
    assert.equal(app.events("page_view").length, 2);
    assert.equal(app.configs().length, 1);
    assert.equal(app.tagSources.length, 1);
    assert.ok(!JSON.stringify(app.events()).includes("private@example.com"));
    checks.push(
      "SPA pathname transition sends one sanitized view; ordinary content rerenders add no view or tag",
    );

    await app.visible();
    await app.visible();
    assert.equal(app.events("view_item_list").length, 1);
    const eventCount = app.events().length;
    await app.choosePreferences("Reject optional");
    assert.equal(
      document.querySelectorAll("[data-vercel-analytics]").length,
      0,
    );
    assert.equal(
      app.analytics.trackEvent("whatsapp_click", {
        component_name: "floating_whatsapp",
      }),
      false,
    );
    assert.equal(
      app.vercelBeforeSend({
        type: "pageview",
        url: "https://www.dreamkeykol.com/contact?email=private@example.com",
      }),
      null,
    );
    await app.visible();
    assert.equal(app.events().length, eventCount);
    assert.equal(window["ga-disable-G-2VBCFFSS0E"], true);
    checks.push(
      "Revocation disables GA and Vercel event delivery without replaying denied interactions",
    );

    await app.choosePreferences("Accept all");
    await app.visible();
    await app.visible();
    await app.render(4);
    await app.visible();
    assert.equal(app.configs().length, 1);
    assert.equal(app.tagSources.length, 1);
    assert.equal(app.events("view_item_list").length, 2);
    assert.equal(app.events("page_view").length, 3);
    assert.equal(
      app.events("page_view").at(-1)[2].page_location,
      "https://www.dreamkeykol.com/buy",
    );
    assert.equal(app.requests, 0);
    checks.push(
      "Fresh consent activation sends one current-page view and visible property impression; callbacks/rerenders do not repeat them or reload the tag",
    );

    const nextProperty = "10000000-0000-4000-8000-000000000002";
    const card = document.querySelector("article[data-property-id]");
    await act(async () => {
      card.dataset.propertyId = nextProperty;
    });
    assert.ok(
      app.observationLog.some(
        (entry) => entry.operation === "unobserve" && entry.id === nextProperty,
      ),
    );
    assert.ok(
      app.observationLog.some(
        (entry) => entry.operation === "observe" && entry.id === nextProperty,
      ),
    );
    await app.visible();
    await app.visible();
    assert.equal(app.events("view_item_list").length, 3);
    assert.equal(
      app.events("view_item_list").at(-1)[2].property_id,
      nextProperty,
    );
    const stale = document.createElement("article");
    stale.dataset.analyticsImpression = "list";
    stale.dataset.propertyId = "10000000-0000-4000-8000-000000000003";
    stale.dataset.propertyType = "FLAT";
    await act(async () => {
      document.body.appendChild(stale);
    });
    await act(async () => {
      stale.remove();
    });
    await app.staleVisibility(stale);
    assert.equal(app.events("view_item_list").length, 3);
    assert.ok(
      app.observationLog.some(
        (entry) =>
          entry.operation === "unobserve" &&
          entry.id === stale.dataset.propertyId,
      ),
    );
    checks.push(
      "Changed property identity is reobserved once; removed cards are unobserved and stale queued visibility cannot emit an impression",
    );
  } finally {
    await app.close();
  }

  for (const analyticsChoice of [false, true]) {
    const persisted = JSON.stringify({
      version: 1,
      analytics: analyticsChoice,
      advertising: false,
      updatedAt: Date.now(),
    });
    app = environment(persisted);
    try {
      await app.render();
      assert.equal(
        document.querySelectorAll("[data-cookie-consent-banner]").length,
        0,
      );
      assert.equal(app.configs().length, analyticsChoice ? 1 : 0);
      assert.equal(app.tagSources.length, analyticsChoice ? 1 : 0);
      assert.equal(app.events("page_view").length, analyticsChoice ? 1 : 0);
      assert.equal(app.requests, 0);
      checks.push(
        `Fresh-page reload respects stored ${analyticsChoice ? "analytics grant" : "rejection"} without duplicate configuration`,
      );
    } finally {
      await app.close();
    }
  }
  const result = {
    checkedAt: new Date().toISOString(),
    passed: checks.length,
    checks,
    scope:
      "Actual AnalyticsProvider, consent UI/store, tracking utility and official installed GA bootstrap executed in React StrictMode/jsdom. Next Script cache, visibility and Vercel transport are isolated. No external requests, GA console receipts or live production verification.",
  };
  fs.writeFileSync(
    path.join(__dirname, "provider-verification.json"),
    JSON.stringify(result, null, 2) + "\n",
  );
  console.log(JSON.stringify(result, null, 2));
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
