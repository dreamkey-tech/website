// Actual API parser/server adapter and Home components with isolated transports.
// Uses only synthetic public fixtures; never requests CRM or production pages.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { Writable } = require("node:stream");
const ts = require("typescript");
const React = require("react");
const { act } = React;
const { renderToString, renderToPipeableStream } = require("react-dom/server");
const { createRoot } = require("react-dom/client");

const cachePath = path.join(require("node:os").homedir(), ".npm/_npx");
const jsdomPath =
  process.env.DREAMKEY_JSDOM_MODULE ||
  fs
    .readdirSync(cachePath)
    .map((entry) => path.join(cachePath, entry, "node_modules/jsdom"))
    .find((entry) => fs.existsSync(path.join(entry, "package.json")));
assert.ok(jsdomPath, "Use a cached, isolated jsdom installation");
const { JSDOM, VirtualConsole } = require(jsdomPath);
const virtualConsole = new VirtualConsole();
virtualConsole.on("jsdomError", (error) => {
  if (!error.message.includes("Not implemented: navigation")) throw error;
});
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
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

let authenticated = false;
let respond;
const calls = [];
const navigation = [];
const modules = new Map();
const icons = new Proxy(
  {},
  { get: () => () => React.createElement("svg", { "aria-hidden": true }) },
);
const mocks = {
  "server-only": {},
  "@/store/authStore": {
    useAuthStore: (selector) =>
      selector({ isAuthenticated: authenticated, isLoading: false }),
  },
  "@/components/auth/AuthForm": {
    __esModule: true,
    default: () => React.createElement("input", { name: "fixture-login" }),
  },
  "next/navigation": {
    useRouter: () => ({
      push: (...args) => navigation.push(["push", ...args]),
      refresh: () => navigation.push(["refresh"]),
    }),
  },
  "next/link": {
    __esModule: true,
    useLinkStatus: () => ({ pending: false }),
    default: ({ prefetch, scroll, children, ...props }) =>
      React.createElement("a", props, children),
  },
  "next/image": {
    __esModule: true,
    default: ({ fill, fetchPriority, ...props }) =>
      React.createElement("img", props),
  },
  "@phosphor-icons/react": icons,
  "@phosphor-icons/react/dist/ssr": icons,
};

function load(filename) {
  const file = path.resolve(filename);
  if (modules.has(file)) return modules.get(file).exports;
  const mod = { exports: {} };
  modules.set(file, mod);
  const compiled = ts.transpileModule(fs.readFileSync(file, "utf8"), {
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
        default: new Proxy({}, { get: (_, key) => String(key) }),
      };
    if (name.startsWith("@/") || name.startsWith(".")) {
      const target = name.startsWith("@/")
        ? path.resolve(name.slice(2))
        : path.resolve(path.dirname(file), name);
      return load(
        [".ts", ".tsx", ""]
          .map((extension) => target + extension)
          .find((candidate) => fs.existsSync(candidate)),
      );
    }
    return require(name);
  };
  const fakeFetch = async (url, options) => {
    calls.push({ url, options });
    return respond(url, options);
  };
  new Function("require", "module", "exports", "fetch", compiled)(
    localRequire,
    mod,
    mod.exports,
    fakeFetch,
  );
  return mod.exports;
}

const model = load("lib/website-properties.ts");
const server = load("lib/website-properties.server.ts");
const BestProperties = load("components/home/BestProperties.tsx").default;
const Card = load("components/home/HomePropertyCard.tsx").default;
const Provider = load("components/property/PropertyAccessProvider.tsx").default;
const ids = [1, 2, 3].map(
  (number) => `20000000-0000-4000-8000-${String(number).padStart(12, "0")}`,
);
const fixture = (index = 0, changes = {}) => ({
  id: ids[index],
  propertyType: "FLAT",
  societyBuildingName: `Fixture residence ${index + 1}`,
  locationArea: "New Town",
  city: "Kolkata",
  carpetAreaSqFt: 1050,
  superBuiltUpAreaSqFt: 1400,
  askingPrice: "7500000",
  pricingType: "SALE",
  bedrooms: 2,
  bathrooms: 2,
  amenities: ["Parking"],
  availabilityStatus: "AVAILABLE",
  coverImage: "https://fixture.example/public-cover.webp",
  previewImages: [],
  ...changes,
});
const payload = (properties = [fixture()]) => ({
  success: true,
  properties,
  total: properties.length,
});
const response = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
const checks = [];
async function check(name, run) {
  calls.length = 0;
  navigation.length = 0;
  authenticated = false;
  await run();
  checks.push(name);
}
function markup(property) {
  return renderToString(
    React.createElement(
      Provider,
      null,
      React.createElement(Card, {
        property: model.propertyCardSchema.parse(property),
      }),
    ),
  );
}
function documentFor(html) {
  return new JSDOM(html).window.document;
}
function featuredElement() {
  const shell = BestProperties();
  const boundary = React.Children.toArray(shell.props.children).find(
    (child) => React.isValidElement(child) && child.type === React.Suspense,
  );
  assert.ok(boundary, "Actual section contains an explicit Suspense boundary");
  return { shell, boundary, content: boundary.props.children };
}
async function featuredMarkup() {
  const { content } = featuredElement();
  return renderToString(await content.type(content.props));
}

(async () => {
  const previousBase = process.env.API_URL;
  process.env.API_URL = "https://fixture.example/";
  try {
    await check(
      "public GET preserves curated order, validates one-to-three records and strips CRM fields",
      async () => {
        for (const count of [1, 2, 3]) {
          const properties = [fixture(2), fixture(0), fixture(1)].slice(
            0,
            count,
          );
          properties[0].owner = { email: "PRIVATE_FIXTURE" };
          properties[0].internalNotes = "PRIVATE_FIXTURE";
          properties[0].media = [{ key: "PRIVATE_FIXTURE" }];
          respond = async () =>
            response({ ...payload(properties), secret: "PRIVATE_FIXTURE" });
          const result = await server.getBestProperties();
          assert.equal(result.kind, "ready");
          assert.deepEqual(
            result.properties.map((item) => item.id),
            properties.map((item) => item.id),
          );
          assert.equal(result.total, count);
          assert.equal(result.properties[0].askingPrice, 7500000);
          assert.ok(!JSON.stringify(result).includes("PRIVATE_FIXTURE"));
        }
        assert.equal(calls.length, 3);
        for (const call of calls) {
          assert.equal(call.url, "https://fixture.example/v1/best-properties");
          assert.equal(call.options.cache, "no-store");
          assert.deepEqual(call.options.headers, {
            Accept: "application/json",
          });
          assert.ok(call.options.signal instanceof AbortSignal);
          assert.ok(!call.options.headers.Cookie);
          assert.ok(!call.options.body);
          assert.ok(!call.options.method || call.options.method === "GET");
        }
      },
    );
    await check(
      "HTTP, transport, malformed JSON and schema failures become honest unavailable results",
      async () => {
        const invalid = [
          { success: false, properties: [fixture()], total: 1 },
          { success: true, properties: [fixture()], total: -1 },
          {
            success: true,
            properties: [{ ...fixture(), id: "not-a-public-uuid" }],
            total: 1,
          },
          {
            success: true,
            properties: [{ ...fixture(), pricingType: "UNKNOWN" }],
            total: 1,
          },
          payload([fixture(), fixture(1), fixture(2), fixture()]),
          { success: true, properties: "bad", total: 0 },
          { success: true, properties: [], total: null },
        ];
        for (const data of invalid) {
          respond = async () => response(data);
          assert.deepEqual(await server.getBestProperties(), { kind: "error" });
        }
        for (const status of [400, 401, 403, 500, 503]) {
          respond = async () => response({}, status);
          assert.deepEqual(await server.getBestProperties(), { kind: "error" });
        }
        respond = async () => {
          throw new TypeError("Fixture network failure");
        };
        assert.deepEqual(await server.getBestProperties(), { kind: "error" });
        respond = async () => {
          throw new DOMException("Fixture timeout", "TimeoutError");
        };
        assert.deepEqual(await server.getBestProperties(), { kind: "error" });
        respond = async () => new Response("not-json");
        assert.deepEqual(await server.getBestProperties(), { kind: "error" });
        delete process.env.API_URL;
        calls.length = 0;
        assert.deepEqual(await server.getBestProperties(), { kind: "error" });
        assert.equal(calls.length, 0);
        process.env.API_URL = "https://fixture.example/";
      },
    );
    await check(
      "empty success stays empty and unsafe photo URLs do not reach image props",
      async () => {
        respond = async () => response(payload([]));
        const empty = await server.getBestProperties();
        assert.equal(empty.kind, "ready");
        assert.equal(empty.properties.length, 0);
        for (const url of [
          null,
          "javascript:alert(1)",
          "data:bad",
          "http://fixture.example/a",
          "https://u:p@fixture.example/a",
        ]) {
          const parsed = model.propertyCardSchema.parse(
            fixture(0, { coverImage: url }),
          );
          assert.equal(parsed.coverImage, null);
          const html = markup(parsed);
          assert.ok(html.includes("Photograph on request"));
          assert.equal(documentFor(html).querySelectorAll("img").length, 0);
        }
      },
    );
    await check(
      "live cards use real detail links, consent-compatible metadata and accurate sale/rent pricing",
      async () => {
        for (const pricingType of ["SALE", "RENT"]) {
          const html = markup(fixture(0, { pricingType }));
          const document = documentFor(html);
          const article = document.querySelector("article");
          assert.equal(article.dataset.propertyId, ids[0]);
          assert.equal(article.dataset.inventorySource, "live");
          assert.equal(article.dataset.listName, "home_featured");
          assert.equal(
            article.dataset.transactionType,
            pricingType === "RENT" ? "rent" : "buy",
          );
          assert.equal(article.dataset.analyticsImpression, "list");
          const links = [...document.querySelectorAll("article a")];
          assert.equal(links.length, 2);
          for (const link of links) {
            assert.equal(link.getAttribute("href"), `/buy/${ids[0]}`);
            assert.equal(link.dataset.analyticsEvent, "select_item");
          }
          assert.ok(document.body.textContent.includes("₹75 L"));
          assert.ok(
            document.body.textContent.includes(
              pricingType === "RENT"
                ? "Apartment for rent"
                : "Apartment for sale",
            ),
          );
          assert.ok(
            !/onwards|sample-buy|illustrative|private_fixture/i.test(html),
          );
          assert.ok(
            !document.body.textContent.includes("per month"),
            "Unknown rental billing period is not invented",
          );
          assert.equal(
            calls.length,
            0,
            "Card rendering has no interest or listing fetch side effects",
          );
        }
      },
    );
    await check(
      "missing commercial facts render on-request values without invented home specifications",
      async () => {
        const html = markup(
          fixture(0, {
            propertyType: "COMMERCIAL",
            societyBuildingName: null,
            locationArea: null,
            city: null,
            bedrooms: null,
            bathrooms: null,
            carpetAreaSqFt: null,
            superBuiltUpAreaSqFt: null,
            askingPrice: null,
          }),
        );
        const text = documentFor(html).body.textContent;
        assert.ok(text.includes("Commercial property for sale"));
        for (const expected of [
          "Price on request",
          "Location on request",
          "Area on request",
        ])
          assert.ok(text.includes(expected));
        assert.ok(!/BHK|baths|onwards|1,050|1,400/.test(text));
        const fallback = documentFor(
          markup(fixture(0, { carpetAreaSqFt: null })),
        );
        assert.ok(
          fallback.body.textContent.includes("1,400 sq.ft super built-up"),
        );
        const unknown = documentFor(
          markup(fixture(0, { propertyType: "UNRECOGNIZED" })),
        );
        assert.equal(
          unknown.querySelector("article").dataset.propertyType,
          "OTHER",
        );
      },
    );
    await check(
      "featured wrapper is synchronous, has a status fallback and keeps error/empty states free of fake stock",
      async () => {
        const { shell, boundary } = featuredElement();
        assert.equal(typeof shell.then, "undefined");
        assert.equal(
          calls.length,
          0,
          "Creating the Home section does not await or start its API request",
        );
        const loading = renderToString(boundary.props.fallback);
        const document = documentFor(loading);
        assert.ok(document.querySelector('[aria-busy="true"]'));
        assert.ok(
          document
            .querySelector('[role="status"]')
            .textContent.includes("Loading featured properties"),
        );
        assert.equal(document.querySelectorAll(".propertyPhoto").length, 3);
        assert.equal(document.querySelectorAll("[data-property-id]").length, 0);
        respond = async () => response(payload([]));
        const empty = await featuredMarkup();
        assert.ok(empty.includes("updating our featured selection"));
        assert.equal(documentFor(empty).querySelectorAll("article").length, 0);
        respond = async () => response({}, 503);
        const error = await featuredMarkup();
        assert.ok(error.includes("temporarily unavailable"));
        assert.equal(documentFor(error).querySelectorAll("article").length, 0);
        for (const html of [empty, error])
          assert.ok(
            !/sample-buy|DreamKey Altura|DreamKey Residences/.test(html),
          );
      },
    );
    await check(
      "one-to-three featured cards preserve API order and stay inside the property access provider",
      async () => {
        for (const count of [1, 2, 3]) {
          const records = [fixture(2), fixture(0), fixture(1)].slice(0, count);
          respond = async () => response(payload(records));
          const { content } = featuredElement();
          const result = await content.type(content.props);
          assert.equal(result.type, Provider);
          const html = renderToString(result);
          const document = documentFor(html);
          assert.equal(
            document
              .querySelector(".propertiesGrid")
              .getAttribute("data-count"),
            String(count),
          );
          assert.deepEqual(
            [...document.querySelectorAll("article")].map(
              (el) => el.dataset.propertyId,
            ),
            records.map((record) => record.id),
          );
        }
      },
    );
    await check(
      "streaming exposes preceding hero content and fallback before a slow featured response resolves",
      async () => {
        // SSR streaming and legacy renderToString are distinct renderer instances.
        // Model their separate module graphs, as Next does for server/client builds.
        modules.clear();
        const StreamingBestProperties = load(
          "components/home/BestProperties.tsx",
        ).default;
        let finishResponse;
        respond = () =>
          new Promise((resolve) => {
            finishResponse = resolve;
          });
        let html = "";
        let stream;
        let shellReady;
        const shell = new Promise((resolve) => {
          shellReady = resolve;
        });
        const done = new Promise((resolve, reject) => {
          const output = new Writable({
            write(chunk, encoding, next) {
              html += chunk.toString();
              next();
            },
          });
          output.on("finish", resolve);
          output.on("error", reject);
          stream = renderToPipeableStream(
            React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "div",
                { id: "hero-fixture" },
                "Hero already visible",
              ),
              React.createElement(StreamingBestProperties),
            ),
            {
              onShellReady() {
                stream.pipe(output);
                shellReady();
              },
              onError: reject,
            },
          );
        });
        const timer = setTimeout(() => stream.abort(), 3000);
        try {
          await shell;
          assert.ok(html.includes("Hero already visible"));
          assert.ok(html.includes("Loading featured properties"));
          assert.ok(!html.includes("Fixture residence"));
          assert.equal(calls.length, 1);
          finishResponse(response(payload([fixture()])));
          await done;
          assert.ok(html.includes("Fixture residence 1"));
          assert.ok(html.includes(`/buy/${ids[0]}`));
        } finally {
          clearTimeout(timer);
        }
      },
    );
    await check(
      "anonymous Home card opens the reused login modal without recording interest",
      async () => {
        modules.clear();
        const ClientProvider = load(
          "components/property/PropertyAccessProvider.tsx",
        ).default;
        const ClientCard = load("components/home/HomePropertyCard.tsx").default;
        const holder = document.createElement("div");
        document.body.appendChild(holder);
        const root = createRoot(holder);
        try {
          await act(async () =>
            root.render(
              React.createElement(
                ClientProvider,
                null,
                React.createElement(ClientCard, {
                  property: model.propertyCardSchema.parse(fixture()),
                }),
              ),
            ),
          );
          const link = holder.querySelector("article a");
          const click = new window.MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          });
          await act(async () => link.dispatchEvent(click));
          assert.equal(click.defaultPrevented, true);
          assert.ok(holder.querySelector("dialog[open]"));
          assert.equal(calls.length, 0);
          assert.equal(navigation.length, 0);
          await act(async () =>
            holder.querySelector('[aria-label="Close login popup"]').click(),
          );
          assert.equal(holder.querySelector("dialog"), null);
          const image = holder.querySelector("img");
          await act(async () => image.dispatchEvent(new window.Event("error")));
          assert.ok(holder.textContent.includes("Photograph on request"));
        } finally {
          await act(async () => root.unmount());
          holder.remove();
        }
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
      "Actual source parser/server adapter, streamed React SSR and React/jsdom component checks with isolated synthetic fixtures. Does not establish live CRM responses, real OTP completion, native animation or deployment.",
  };
  fs.writeFileSync(
    "output/best-properties/source-verification.json",
    JSON.stringify(result, null, 2) + "\n",
  );
  console.log(JSON.stringify(result, null, 2));
  dom.window.close();
})().catch((error) => {
  console.error(error);
  dom.window.close();
  process.exitCode = 1;
});
