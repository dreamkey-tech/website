// Execute actual rental filters, server adapter and card components with local
// fetch/Next adapters. No real account, backend, lead or interest request.
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const modules = new Map(),
  calls = [],
  checks = [];
let respond;
const mocks = {
  "server-only": {},
  "next/navigation": {
    useRouter: () => ({ push() {}, refresh() {}, replace() {} }),
  },
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
  sonner: { toast: { success() {} } },
};
const fakeFetch = async (url, options) => {
  calls.push({ url, options });
  return respond(url, options);
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
      const target = name.startsWith("@/")
        ? path.resolve(name.slice(2))
        : path.resolve(path.dirname(file), name);
      const resolved = [".ts", ".tsx", ""]
        .map((extension) => target + extension)
        .find((candidate) => fs.existsSync(candidate));
      if (!resolved) throw new Error(`Cannot resolve ${name} from ${file}`);
      return load(resolved);
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
const id = "20000000-0000-4000-8000-000000000001";
const card = {
  id,
  propertyType: "FLAT",
  societyBuildingName: "Rental Fixture Residence",
  locationArea: "New Town Action Area III",
  city: "Kolkata",
  carpetAreaSqFt: 1650,
  superBuiltUpAreaSqFt: 2150,
  askingPrice: 42000,
  pricingType: "RENT",
  bedrooms: 3,
  bathrooms: 3,
  amenities: ["Security", "Parking"],
  availabilityStatus: "AVAILABLE",
  coverImage: "https://example.com/cover.jpg",
  previewImages: [],
  owner: { phone: "PRIVATE_OWNER_PHONE" },
  internalNotes: "PRIVATE_RENTAL_CRM_NOTE",
  furnishing: "PRIVATE_UNSUPPORTED_FIELD",
};
const response = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
const list = (properties = [card], page = 1, total = properties.length) => ({
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
const filters = load("components/pages/rental-filters.ts");
const model = load("lib/website-properties.ts");
const server = load("lib/website-properties.server.ts");
async function check(name, fn) {
  calls.length = 0;
  await fn();
  checks.push(name);
}
(async () => {
  const previousBase = process.env.API_URL;
  process.env.API_URL = "http://local-fixture.invalid";
  try {
    await check(
      "rental query locks RENT and sends supported monthly-INR filters and sort",
      () => {
        const value = filters.parseRentFilters({
          q: "  Riverside  ",
          location: "new-town",
          type: "FLAT",
          budget: "50000",
          maxPrice: "30000",
          bedrooms: "3",
          sort: "price-low",
          page: "2",
          furnishing: "Furnished",
          pricingType: "SALE",
        });
        const query = filters.rentalApiQuery(value);
        assert.equal(query.get("pricingType"), "RENT");
        assert.equal(query.get("city"), "Kolkata");
        assert.equal(query.get("search"), "Riverside");
        assert.equal(query.get("locationArea"), "New Town");
        assert.equal(query.get("propertyType"), "FLAT");
        assert.equal(query.get("bedrooms"), "3");
        assert.equal(query.get("maxPrice"), "30000");
        assert.equal(query.get("sortBy"), "askingPrice");
        assert.equal(query.get("sortOrder"), "asc");
        assert.equal(query.get("page"), "2");
        assert.equal(query.get("limit"), "6");
        assert.ok(!query.has("furnishing"));
        assert.equal(
          query.has("minPrice"),
          false,
          "Monthly cap must not become a sale-price band",
        );
      },
    );
    await check(
      "invalid query inputs are bounded; rental links and chips retain only supported state",
      () => {
        const invalid = filters.parseRentFilters({
          q: "x".repeat(200),
          page: "NaN",
          type: "INVALID",
          budget: "999999",
          bedrooms: "99",
          maxPrice: "-1",
          location: "INVALID",
          furnishing: "Furnished",
        });
        assert.ok(invalid.q.length <= 120);
        assert.equal(invalid.page, 1);
        for (const key of [
          "type",
          "budget",
          "bedrooms",
          "maxPrice",
          "location",
        ])
          assert.equal(invalid[key], "", key);
        const value = filters.parseRentFilters({
          location: "new-town",
          budget: "50000",
          sort: "price-high",
          page: "2",
        });
        const query = new URLSearchParams(filters.rentQueryEntries(value));
        assert.equal(query.get("budget"), "50000");
        const href = filters.rentHref(value, { bedrooms: "3", page: 1 });
        assert.ok(href.startsWith("/rent?"));
        assert.ok(href.includes("bedrooms=3"));
        assert.ok(!href.includes("page=2"));
        assert.ok(
          filters
            .activeRentFilters(value)
            .every((chip) => chip.href.startsWith("/rent")),
        );
        assert.ok(!JSON.stringify(value).includes("furnishing"));
        assert.equal(
          filters
            .rentalApiQuery(filters.parseRentFilters({ sort: "area-desc" }))
            .get("sortBy"),
          "carpetAreaSqFt",
        );
      },
    );
    await check(
      "public rental fetch is fresh, cookie-free and strips unapproved CRM fields",
      async () => {
        respond = async () => response(list());
        const data = await server.getRentalCatalogue("");
        assert.equal(data.kind, "ready");
        assert.equal(data.properties.length, 1);
        assert.equal(data.properties[0].pricingType, "RENT");
        for (const word of [
          "PRIVATE_OWNER_PHONE",
          "PRIVATE_RENTAL_CRM_NOTE",
          "PRIVATE_UNSUPPORTED_FIELD",
        ])
          assert.ok(!JSON.stringify(data).includes(word));
        assert.equal(calls.length, 1);
        const request = calls[0];
        assert.equal(
          new URL(request.url).searchParams.get("pricingType"),
          "RENT",
        );
        assert.equal(request.options.cache, "no-store");
        assert.equal(request.options.headers.Cookie, undefined);
        assert.equal(request.options.headers.Accept, "application/json");
      },
    );
    await check(
      "rental pagination clamps and refetches against RENT totals",
      async () => {
        respond = async (url) =>
          response(
            list(
              new URL(url).searchParams.get("page") === "999" ? [] : [card],
              Number(new URL(url).searchParams.get("page")),
              7,
            ),
          );
        const data = await server.getRentalCatalogue("page=999");
        assert.equal(data.kind, "ready");
        assert.equal(data.filters.page, 2);
        assert.equal(data.pagination.page, 2);
        assert.equal(calls.length, 2);
        assert.ok(
          calls.every(
            (call) =>
              new URL(call.url).searchParams.get("pricingType") === "RENT",
          ),
        );
      },
    );
    await check(
      "upstream failures and mixed SALE pages show errors without sample fallback or false totals",
      async () => {
        for (const reply of [
          () => response({}, 503),
          () => response(list([{ ...card, pricingType: "SALE" }])),
          () =>
            response(
              list([
                card,
                {
                  ...card,
                  id: "20000000-0000-4000-8000-000000000002",
                  pricingType: "SALE",
                },
              ]),
            ),
          () => response({ success: true, properties: [card] }),
        ]) {
          respond = reply;
          const data = await server.getRentalCatalogue("");
          assert.equal(data.kind, "error");
          assert.equal(data.properties, undefined);
        }
        respond = async () => response(list([], 1, 0));
        const empty = await server.getRentalCatalogue("");
        assert.equal(empty.kind, "ready");
        assert.equal(empty.properties.length, 0);
        assert.equal(empty.pagination.total, 0);
      },
    );
    await check(
      "live rental cards show backend rent, actual bath/area facts and shared protected UUID links",
      () => {
        const Provider = load(
          "components/property/PropertyAccessProvider.tsx",
        ).default;
        const Card = load("components/pages/RentalCard.tsx").default;
        const property = model.propertyCardSchema.parse(card);
        const html = renderToStaticMarkup(
          React.createElement(
            Provider,
            null,
            React.createElement(Card, { property }),
          ),
        );
        assert.ok(html.includes("Rental Fixture Residence"));
        assert.ok(html.includes("₹42,000"));
        assert.ok(
          html.includes("Rent"),
          "API rent is labelled without inventing a rental period",
        );
        assert.ok(html.includes("3 baths"));
        assert.ok(html.includes("1,650 sq.ft"));
        assert.ok(html.includes(`/buy/${id}`));
        assert.ok(html.includes('data-list-name="rent_catalogue"'));
        assert.ok(html.includes('data-inventory-source="live"'));
        assert.ok(html.includes('data-transaction-type="rent"'));
        for (const forbidden of [
          "Illustrative",
          "sample collection",
          "for sale",
          "PRIVATE_",
          "Furnished",
          "Semi-furnished",
        ])
          assert.ok(!html.includes(forbidden), forbidden);
        assert.equal(
          calls.length,
          0,
          "Rendering a card never records interest",
        );
      },
    );
    await check(
      "rental details retain the existing backend auth boundary and sanitized DTO",
      async () => {
        assert.equal((await server.getWebsiteProperty(id, "")).kind, "login");
        assert.equal(calls.length, 0);
        respond = async () => response({}, 401);
        assert.equal(
          (await server.getWebsiteProperty(id, "access_token=invalid")).kind,
          "login",
        );
        respond = async () =>
          response({
            success: true,
            property: { ...card, builderName: "Fixture Builder" },
          });
        const detail = await server.getWebsiteProperty(
          id,
          "access_token=local-rent-verified",
        );
        assert.equal(detail.kind, "ready");
        assert.equal(detail.property.pricingType, "RENT");
        assert.ok(!JSON.stringify(detail).includes("PRIVATE_"));
        const Details = load(
          "components/property/LivePropertyDetails.tsx",
        ).default;
        const rentHtml = renderToStaticMarkup(
          React.createElement(Details, { property: detail.property }),
        );
        assert.ok(rentHtml.includes('href="/rent"'));
        assert.ok(rentHtml.includes("Rent. Confirm charges"));
        assert.ok(!rentHtml.includes("Asking price. Confirm charges"));
        const saleHtml = renderToStaticMarkup(
          React.createElement(Details, {
            property: { ...detail.property, pricingType: "SALE" },
          }),
        );
        assert.ok(saleHtml.includes('href="/buy"'));
        assert.ok(saleHtml.includes("Asking price. Confirm charges"));
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
      "Actual TypeScript filters/server and React SSR with isolated fetch/Next adapters. No live backend, browser or CRM mutation.",
  };
  fs.writeFileSync(
    "output/rent-api/source-verification.json",
    JSON.stringify(result, null, 2) + "\n",
  );
  console.log(JSON.stringify(result, null, 2));
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
