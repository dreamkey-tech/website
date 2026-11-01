// Historical sample-only harness (30 October). Intentionally superseded by
// output/website-properties/check-http.cjs after the API/login-gate migration.
// Local production HTTP checks; no lead submission or external messaging.
// Run from the repo root: node output/property-details/check-property-details.cjs [base URL]
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const base = process.argv[2] || "http://localhost:3027";
const catalog = { exports: {} };
new Function(
  "module",
  "exports",
  ts.transpileModule(fs.readFileSync("components/buy/buy-data.ts", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText,
)(catalog, catalog.exports);
const { BUY_HOMES, buyPropertyHref, buyEnquiryHref } = catalog.exports;
const decode = (text) => text.replace(/&amp;/g, "&").replace(/&#x27;/g, "'");
async function get(path) {
  const response = await fetch(base + path, {
    headers: { "User-Agent": "Googlebot" },
  });
  return { response, html: await response.text() };
}
async function main() {
  const paths = BUY_HOMES.map(buyPropertyHref);
  assert.equal(new Set(paths).size, BUY_HOMES.length);
  const checks = [];
  for (const home of BUY_HOMES) {
    const route = buyPropertyHref(home);
    const { response, html } = await get(route);
    assert.equal(response.status, 200, route);
    assert.ok(html.includes(home.title), route);
    assert.ok(html.includes(home.price), route);
    assert.ok(html.includes(home.size), route);
    assert.match(html, /name="robots" content="noindex, follow"/);
    assert.ok(
      html.includes(`href="https://www.dreamkeykol.com${route}"`),
      "Canonical",
    );
    for (const anchor of ["overview", "details", "amenities", "location"])
      assert.ok(html.includes(`id="${anchor}"`), anchor);
    assert.match(html, /View all <!-- -->5<!-- --> photos|View all 5 photos/);
    assert.ok(decode(html).includes(buyEnquiryHref(home)), "Contact prefill");
    assert.match(html, /Bathrooms/);
    assert.match(html, /Confirm with our team/);
    assert.match(html, /Illustrative images/);
    assert.match(html, /Area overview only, not an exact property pin/);
    assert.match(html, /aria-label="Main navigation"/);
    assert.doesNotMatch(html, /"@type":"(?:Offer|Review|AggregateRating)"/);
    assert.doesNotMatch(html, /WBHIRA|WBRERA|8697559123|8100379277|6291425620/);
    if (home.status === "waitlist")
      assert.match(html, /Ask about alternatives/);
    checks.push({ route, status: response.status });
  }
  for (const page of ["/buy", "/buy?page=2"]) {
    const { response, html } = await get(page);
    assert.equal(response.status, 200);
    const detailLinks = [
      ...html.matchAll(/aria-label="View ([^"]+) property details"/g),
    ];
    assert.equal(detailLinks.length, page.includes("page=2") ? 2 : 6);
    for (const link of detailLinks) {
      const home = BUY_HOMES.find((item) => item.title === link[1]);
      assert.ok(html.includes(`href="${buyPropertyHref(home)}"`));
    }
  }
  const missing = await get("/buy/not-a-real-property");
  // Next can stream a not-found response after status headers have already been sent.
  assert.ok([200, 404].includes(missing.response.status));
  assert.match(missing.html, /This home isn/);
  assert.match(missing.html, /noindex/);
  const sitemap = await get("/sitemap.xml");
  for (const path of paths)
    assert.ok(
      !sitemap.html.includes(path),
      "No illustrative detail URLs in sitemap",
    );
  const photo = await get("/images/property/bedroom-v1.webp");
  assert.equal(photo.response.status, 200);
  assert.match(photo.response.headers.get("content-type"), /image\/webp/);
  const report = {
    checkedAt: new Date().toISOString(),
    checks,
    passed: [
      "8 distinct request-rendered property pages",
      "Buy image/title detail links and retained enquiry links",
      "page-specific canonical and sample noindex",
      "unknown unit fields and photo/area disclosures",
      "missing record fallback",
      "existing sitemap excludes illustrative details",
      "local bedroom image delivery",
    ],
    scope:
      "Local production HTTP/SSR, not browser interactions, live inventory or enquiry delivery.",
  };
  fs.writeFileSync(
    "output/property-details/verification.json",
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
