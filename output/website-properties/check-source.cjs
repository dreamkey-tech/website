// Actual adapters, validation, server data access and React components; no network.
const fs = require("node:fs"),
  path = require("node:path"),
  assert = require("node:assert/strict"),
  ts = require("typescript");
const cache = path.join(require("node:os").homedir(), ".npm/_npx");
const jsdom =
  process.env.DREAMKEY_JSDOM_MODULE ||
  fs
    .readdirSync(cache)
    .map((p) => path.join(cache, p, "node_modules/jsdom"))
    .find((p) => fs.existsSync(path.join(p, "package.json")));
const { JSDOM, VirtualConsole } = require(jsdom);
const virtualConsole = new VirtualConsole();
virtualConsole.on("jsdomError", (error) => {
  // jsdom cannot follow the Ctrl-click default navigation asserted below.
  if (!error.message.includes("Not implemented: navigation")) throw error;
});
const dom = new JSDOM("<html><body></body></html>", {
  url: "http://localhost/",
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
const React = require("react"),
  { act } = React,
  { createRoot } = require("react-dom/client"),
  { renderToString } = require("react-dom/server"),
  { AxiosError } = require("axios");
const calls = [],
  navigation = [],
  checks = [];
let respond, httpRespond;
const httpCalls = [];
const router = Object.fromEntries(
  ["push", "replace", "refresh"].map((key) => [
    key,
    (...args) => navigation.push([key, ...args]),
  ]),
);
const modules = new Map();
const mocks = {
  "server-only": {},
  "next/navigation": { useRouter: () => router },
  "next/link": {
    __esModule: true,
    useLinkStatus: () => ({ pending: false }),
    default: ({ children, prefetch, scroll, ...props }) =>
      React.createElement("a", props, children),
  },
  "next/image": {
    __esModule: true,
    default: ({ fill, fetchPriority, loading, ...props }) =>
      React.createElement("img", props),
  },
  "@phosphor-icons/react": new Proxy(
    {},
    { get: () => () => React.createElement("svg", { "aria-hidden": true }) },
  ),
  "@phosphor-icons/react/dist/ssr": new Proxy(
    {},
    { get: () => () => React.createElement("svg", { "aria-hidden": true }) },
  ),
  sonner: { toast: { success: () => {} } },
};
const fakeFetch = async (url, options) => {
  httpCalls.push({ url, options });
  return httpRespond(url, options);
};
function load(file) {
  file = path.resolve(file);
  if (modules.has(file)) return modules.get(file).exports;
  const mod = { exports: {} };
  modules.set(file, mod);
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
      const p = name.startsWith("@/")
        ? path.resolve(name.slice(2))
        : path.resolve(path.dirname(file), name);
      return load(
        [".ts", ".tsx", ""].map((ext) => p + ext).find((x) => fs.existsSync(x)),
      );
    }
    return require(name);
  };
  new Function("require", "module", "exports", "fetch", code)(
    localRequire,
    mod,
    mod.exports,
    fakeFetch,
  );
  return mod.exports;
}
const model = load("lib/website-properties.ts"),
  filters = load("components/buy/website-filters.ts"),
  returns = load("lib/auth-return.ts");
const { apiClient } = load("api/client.ts");
const { useAuthStore } = load("store/authStore.ts");
apiClient.defaults.adapter = async (config) => {
  const body = config.data ? JSON.parse(config.data) : undefined;
  calls.push({
    url: config.url,
    body,
    base: config.baseURL,
    cookies: config.withCredentials,
  });
  const response = {
    status: 200,
    config,
    headers: {},
    ...(await respond(config, body)),
  };
  if (response.status >= 400)
    throw new AxiosError(
      "Local fixture",
      "ERR_BAD_REQUEST",
      config,
      undefined,
      response,
    );
  return response;
};
const id = "10000000-0000-4000-8000-000000000001";
const card = {
  id,
  propertyType: "FLAT",
  societyBuildingName: "Test Residence",
  locationArea: "New Town",
  city: "Kolkata",
  carpetAreaSqFt: 1100,
  superBuiltUpAreaSqFt: 1450,
  askingPrice: 7500000,
  pricingType: "SALE",
  bedrooms: 2,
  bathrooms: 2,
  amenities: ["Parking"],
  availabilityStatus: "AVAILABLE",
  coverImage: "https://example.com/cover.jpg",
  previewImages: ["https://example.com/preview.jpg"],
};
const user = {
  id: "local-user",
  name: "Test Resident",
  email: "resident@example.com",
  emailVerified: true,
};
function happy(config, body) {
  if (config.url.endsWith("/login"))
    return { data: { success: true, requiresOtp: true, email: body.email } };
  if (config.url.endsWith("/verify-login-otp"))
    return { data: { success: true, user } };
  return { status: 201, data: { success: true } };
}
const response = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
const list = (properties = [card], page = 1, total = 1) => ({
  success: true,
  properties,
  pagination: {
    total,
    page,
    limit: 6,
    totalPages: Math.ceil(total / 6),
    hasNextPage: page < Math.ceil(total / 6),
    hasPrevPage: page > 1,
  },
});
const server = load("lib/website-properties.server.ts");
const Provider = load("components/property/PropertyAccessProvider.tsx").default,
  PropertyLink = load("components/property/PropertyLink.tsx").default,
  Session = load("components/property/PropertySession.tsx").default,
  AuthForm = load("components/auth/AuthForm.tsx").default;
async function flush() {
  await act(async () => new Promise((resolve) => setTimeout(resolve, 30)));
}
async function mount(element) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  await act(async () => root.render(element));
  return {
    async render(next) {
      await act(async () => root.render(next));
    },
    async close() {
      await act(async () => root.unmount());
      el.remove();
    },
  };
}
async function input(name, value) {
  const el = document.querySelector(`[name="${name}"]`);
  assert.ok(el);
  await act(async () => {
    Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    ).set.call(el, value);
    el.dispatchEvent(new window.Event("input", { bubbles: true }));
  });
}
async function submit() {
  await act(async () =>
    document
      .querySelector("form")
      .dispatchEvent(
        new window.Event("submit", { bubbles: true, cancelable: true }),
      ),
  );
}
async function button(text) {
  const el = [...document.querySelectorAll("button")].find(
    (x) => x.textContent === text,
  );
  assert.ok(el, text);
  await act(async () => el.click());
}
async function check(name, run) {
  calls.length = navigation.length = httpCalls.length = 0;
  respond = happy;
  useAuthStore.getState().setUser(null);
  await run();
  checks.push(name);
}
(async () => {
  const previousBase = process.env.API_URL;
  process.env.API_URL = "https://local-fixture.example";
  try {
    await check(
      "card/detail DTO strips CRM fields and rejects unsafe or private media",
      async () => {
        const detail = model.propertyDetailSchema.parse({
          ...card,
          floorNumber: -1,
          internalNotes: "PRIVATE",
          owner: { phone: "PRIVATE" },
          media: [
            {
              category: "PHOTOGRAPH",
              url: "https://example.com/photo.jpg",
              mimeType: "image/jpeg",
              key: "PRIVATE_STORAGE_KEY",
            },
            {
              category: "FLOOR_PLAN",
              url: "https://example.com/plan.pdf",
              mimeType: "application/pdf",
            },
            {
              category: "BROCHURE",
              url: "https://example.com/private.pdf",
              mimeType: "application/pdf",
            },
            {
              category: "PHOTOGRAPH",
              url: "javascript:alert(1)",
              mimeType: "image/jpeg",
            },
            {
              category: "PHOTOGRAPH",
              url: "https://example.com/mislabelled.pdf",
              mimeType: "application/pdf",
            },
          ],
        });
        assert.equal(detail.media.length, 2);
        assert.equal(detail.floorNumber, -1);
        assert.ok(!JSON.stringify(detail).includes("PRIVATE"));
        assert.ok(!JSON.stringify(detail).includes("private.pdf"));
        assert.equal(
          model.propertyCardSchema.parse({
            ...card,
            askingPrice: "9500000",
            bedrooms: null,
            coverImage: "data:bad",
          }).askingPrice,
          9500000,
        );
        for (const url of [
          "javascript:alert(1)",
          "data:text/html,test",
          "https://user:pass@example.com/x",
          "http://example.com/image.jpg",
        ])
          assert.equal(model.publicMediaUrl(url), null);
        assert.equal(
          model.propertyPrice({ ...card, askingPrice: 18500000 }),
          "₹1.85 Cr",
        );
        assert.equal(
          model.propertyPrice({ ...card, askingPrice: null }),
          "Price on request",
        );
      },
    );
    await check(
      "query mapping preserves hero aliases and sends supported backend filters with INR amounts",
      async () => {
        const value = filters.parseBuyFilters({
          type: "apartment",
          bedrooms: "4bhk",
          location: "new-town",
          budget: "75l-1.5cr",
          maxPrice: "1.1",
          sort: "price-asc",
          page: "2",
          status: "ready",
          amenity: "pool",
        });
        const query = filters.saleApiQuery(value);
        assert.equal(query.get("propertyType"), "FLAT");
        assert.equal(query.get("bedrooms"), "4+");
        assert.equal(query.get("locationArea"), "New Town");
        assert.equal(query.get("minPrice"), "7500000");
        assert.equal(query.get("maxPrice"), "11000000");
        assert.equal(query.get("sortOrder"), "asc");
        assert.equal(query.get("pricingType"), "SALE");
        assert.ok(!query.has("status") && !query.has("amenity"));
        assert.ok(
          filters
            .activeBuyFilters(value)
            .every((x) => !x.label.includes("ready")),
        );
        assert.equal(
          filters.parseBuyFilters({
            page: "NaN",
            maxPrice: "-2",
            type: "INVALID",
          }).page,
          1,
        );
      },
    );
    await check(
      "return destinations stay same-origin and account links retain the property",
      async () => {
        for (const value of [
          "https://evil.example",
          "//evil.example",
          "/\\evil.example",
          "/login",
          undefined,
          ["/buy"],
        ])
          assert.equal(returns.safeAuthReturnTo(value), "/buy");
        assert.equal(returns.safeAuthReturnTo(`/buy/${id}`), `/buy/${id}`);
        assert.ok(
          returns.authPageHref("/register", `/buy/${id}`).includes("returnTo="),
        );
      },
    );
    await check(
      "public catalogue fetch is cookie-free, fresh, paginated and never substitutes sample stock on failure",
      async () => {
        httpRespond = async (url) =>
          response(
            list(
              url.includes("page=9") ? [] : [card],
              url.includes("page=9") ? 9 : 1,
            ),
          );
        const data = await server.getSaleCatalogue("page=9");
        assert.equal(data.kind, "ready");
        assert.equal(data.filters.page, 1);
        assert.equal(httpCalls.length, 2);
        const empty = await server.getSaleCatalogue(
          "budget=above-4&maxPrice=1",
        );
        assert.equal(empty.kind, "ready");
        assert.equal(empty.properties.length, 0);
        assert.equal(
          httpCalls.length,
          2,
          "Conflicting price bounds stay local",
        );
        assert.ok(
          httpCalls.every(
            (x) => x.options.cache === "no-store" && !x.options.headers.Cookie,
          ),
        );
        httpRespond = async () => response({ success: false }, 503);
        assert.equal((await server.getSaleCatalogue("")).kind, "error");
        httpRespond = async () =>
          response(list([{ ...card, pricingType: "RENT" }]));
        assert.equal((await server.getSaleCatalogue("")).kind, "error");
      },
    );
    await check(
      "details require backend authorization and discard internal fields before rendering",
      async () => {
        assert.equal((await server.getWebsiteProperty(id, "")).kind, "login");
        assert.equal(httpCalls.length, 0);
        for (const status of [401, 403]) {
          httpRespond = async () => response({}, status);
          assert.equal(
            (await server.getWebsiteProperty(id, "access_token=invalid")).kind,
            "login",
          );
        }
        httpRespond = async () => response({}, 404);
        assert.equal(
          (await server.getWebsiteProperty(id, "access_token=local")).kind,
          "missing",
        );
        httpRespond = async () =>
          response({
            success: true,
            property: {
              ...card,
              internalNotes: "PRIVATE",
              owner: { name: "PRIVATE" },
            },
          });
        const data = await server.getWebsiteProperty(id, "access_token=local");
        assert.equal(data.kind, "ready");
        assert.ok(!JSON.stringify(data.property).includes("PRIVATE"));
        assert.equal(
          httpCalls.at(-1).options.headers.Cookie,
          "access_token=local",
        );
      },
    );
    await check(
      "anonymous card opens reusable modal; cancel and modifier clicks preserve browsing behavior",
      async () => {
        const ui = await mount(
          React.createElement(
            Provider,
            null,
            React.createElement(
              PropertyLink,
              { href: `/buy/${id}` },
              "View listing",
            ),
          ),
        );
        const a = document.querySelector("a");
        let event = new window.MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          ctrlKey: true,
        });
        await act(async () => a.dispatchEvent(event));
        assert.equal(event.defaultPrevented, false);
        assert.equal(document.querySelector("dialog"), null);
        event = new window.MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        });
        await act(async () => a.dispatchEvent(event));
        await flush();
        assert.equal(event.defaultPrevented, true);
        assert.ok(document.querySelector("dialog[open]"));
        assert.equal(calls.length, 0);
        await button("Create account");
        assert.ok(document.querySelector('[name="name"]'));
        await act(async () =>
          document.querySelector('[aria-label="Close login popup"]').click(),
        );
        assert.equal(document.querySelector("dialog"), null);
        assert.equal(document.body.style.overflow, "");
        await ui.close();
      },
    );
    await check(
      "popup OTP completion resumes the selected listing instead of generic Buy",
      async () => {
        const ui = await mount(
          React.createElement(
            Provider,
            null,
            React.createElement(
              PropertyLink,
              { href: `/buy/${id}` },
              "View listing",
            ),
          ),
        );
        await act(async () => document.querySelector("a").click());
        await flush();
        await input("email", user.email);
        await input("password", "dummy-password");
        await submit();
        assert.equal(navigation.length, 0);
        assert.ok(document.querySelector('[name="otp"]'));
        await input("otp", "0123");
        await submit();
        assert.equal(document.querySelector("dialog"), null);
        assert.deepEqual(navigation, [["push", `/buy/${id}`], ["refresh"]]);
        await ui.close();
      },
    );
    await check(
      "standalone OTP login honors safe returnTo and rejects external destinations",
      async () => {
        for (const destination of [`/buy/${id}`, "https://evil.example"]) {
          navigation.length = 0;
          const ui = await mount(
            React.createElement(AuthForm, {
              mode: "login",
              returnTo: destination,
            }),
          );
          await input("email", user.email);
          await input("password", "dummy-password");
          await submit();
          await input("otp", "0123");
          await submit();
          assert.equal(
            navigation[0][1],
            destination.startsWith("/") ? destination : "/buy",
          );
          await ui.close();
        }
      },
    );
    await check(
      "interest is absent during SSR and sent once after a Strict Mode mount",
      async () => {
        const element = () =>
          React.createElement(
            React.StrictMode,
            null,
            React.createElement(
              Provider,
              null,
              React.createElement(
                Session,
                { id },
                React.createElement("p", null, "Protected detail"),
              ),
            ),
          );
        renderToString(element());
        assert.equal(calls.length, 0);
        const ui = await mount(element());
        await flush();
        assert.equal(calls.length, 1);
        assert.equal(calls[0].url, `/v1/website/properties/list/${id}/click`);
        assert.equal(calls[0].body, undefined);
        assert.equal(calls[0].cookies, true);
        assert.equal(calls[0].base, "/api-proxy");
        await ui.render(element());
        await flush();
        assert.equal(calls.length, 1);
        await ui.close();
      },
    );
    await check(
      "failed interest can retry explicitly; 401 hides details and requests login",
      async () => {
        respond = () => ({ status: 503, data: { success: false } });
        let ui = await mount(
          React.createElement(
            Provider,
            null,
            React.createElement(
              Session,
              { id },
              React.createElement("p", null, "Protected detail"),
            ),
          ),
        );
        await flush();
        assert.ok(
          document.body.textContent.includes("couldn’t save your interest"),
        );
        assert.equal(calls.length, 1);
        respond = happy;
        await button("Try again");
        await flush();
        assert.equal(calls.length, 2);
        assert.ok(!document.body.textContent.includes("couldn’t save"));
        await ui.close();
        respond = () => ({ status: 401, data: { message: "Login required" } });
        ui = await mount(
          React.createElement(
            Provider,
            null,
            React.createElement(
              Session,
              { id },
              React.createElement("p", null, "Protected detail"),
            ),
          ),
        );
        await flush();
        await flush();
        assert.ok(!document.body.textContent.includes("Protected detail"));
        assert.ok(document.querySelector("dialog[open]"));
        await ui.close();
      },
    );
  } finally {
    if (previousBase === undefined) delete process.env.API_URL;
    else process.env.API_URL = previousBase;
  }
  const result = {
    passed: checks.length,
    checks,
    scope:
      "Actual source in React/jsdom and isolated Axios/fetch adapters. No live accounts, details or CRM activity.",
  };
  fs.writeFileSync(
    "output/website-properties/source-verification.json",
    JSON.stringify(result, null, 2) + "\n",
  );
  console.log(JSON.stringify(result, null, 2));
  dom.window.close();
})().catch((e) => {
  console.error(e);
  dom.window.close();
  process.exitCode = 1;
});
