// Run against a production build: node output/seo/check-seo.cjs [base URL]
// Uses Node's built-in fetch; no browser, backend account, or extra dependency needed.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const base = process.argv[2] || "http://localhost:3002";
const origin = "https://www.dreamkeykol.com";
const publicRoutes = [
  "/",
  "/buy",
  "/rent",
  "/sell",
  "/services",
  "/about",
  "/contact",
  "/careers",
  "/privacy",
  "/terms-and-conditions",
];
const decode = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x([0-9a-f]+);/gi, (_, n) =>
      String.fromCodePoint(parseInt(n, 16)),
    )
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
const attributes = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [
      match[1],
      decode(match[2]),
    ]),
  );
const meta = (html, key) =>
  [...html.matchAll(/<meta\b[^>]*>/g)]
    .map((match) => attributes(match[0]))
    .find((item) => item.name === key || item.property === key)?.content;
const canonical = (html) =>
  [...html.matchAll(/<link\b[^>]*>/g)]
    .map((match) => attributes(match[0]))
    .find((item) => item.rel === "canonical")?.href;
const schemas = (html) =>
  [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter((match) => attributes(match[1]).type === "application/ld+json")
    .map((match) => JSON.parse(match[2]));
const get = async (route) => {
  const response = await fetch(base + route, {
    headers: { "User-Agent": "Googlebot" },
  });
  return { response, html: await response.text() };
};

async function main() {
  const checks = [];
  const titles = new Set();
  let home, services;
  for (const route of [...publicRoutes, "/login", "/register"]) {
    const { response, html } = await get(route);
    assert.equal(response.status, 200, route);
    assert.equal(
      new URL(canonical(html)).href,
      new URL(origin + route).href,
      route + " canonical",
    );
    const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] || "");
    assert.ok(title && !titles.has(title), route + " unique title");
    titles.add(title);
    assert.ok(meta(html, "description"), route + " description");
    assert.equal(meta(html, "og:title"), title, route + " OG title");
    assert.equal(
      new URL(meta(html, "og:url")).href,
      new URL(origin + route).href,
      route + " OG URL",
    );
    assert.equal(meta(html, "twitter:title"), title, route + " Twitter title");
    assert.equal(meta(html, "og:image"), origin + "/images/OG.webp");
    assert.equal(meta(html, "og:image:width"), "1920");
    assert.equal(meta(html, "og:image:height"), "862");
    assert.equal(meta(html, "og:image:type"), "image/webp");
    assert.equal(meta(html, "twitter:image"), origin + "/images/OG.webp");
    assert.match(html, /<h1\b/, route + " server-rendered heading");
    assert.match(
      meta(html, "robots"),
      publicRoutes.includes(route) ? /^index, follow/ : /^noindex, follow/,
      route + " indexing",
    );
    if (route === "/") home = html;
    if (route === "/services") services = html;
    checks.push({
      route,
      status: response.status,
      title,
      canonical: canonical(html),
      ogImage: meta(html, "og:image"),
      twitterImage: meta(html, "twitter:image"),
      robots: meta(html, "robots"),
    });
  }

  for (const [route, expected, noindex] of [
    ["/buy?page=2", "/buy?page=2", false],
    ["/buy?page=9999", "/buy?page=2", false],
    ["/buy?utm_source=example", "/buy", false],
    ["/buy?page=invalid&type=invalid", "/buy", false],
    ["/buy?q=no-such-property&page=2", "/buy?q=no-such-property", true],
    ["/buy?location=new-town", "/buy?location=new-town", true],
    ["/buy?sort=price-asc", "/buy?sort=price-asc", true],
  ]) {
    const { response, html } = await get(route);
    assert.equal(response.status, 200, route);
    assert.equal(canonical(html), origin + expected, route);
    assert.match(
      meta(html, "robots"),
      noindex ? /^noindex, follow/ : /^index, follow/,
      route,
    );
    if (expected === "/buy?page=2")
      assert.match(meta(html, "og:title"), /Page 2/);
    checks.push({
      route,
      canonical: canonical(html),
      robots: meta(html, "robots"),
    });
  }

  const sitemap = await get("/sitemap.xml");
  assert.equal(sitemap.response.status, 200);
  assert.match(sitemap.response.headers.get("content-type"), /xml/);
  const urls = [...sitemap.html.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
    decode(match[1]),
  );
  assert.deepEqual(
    urls.sort(),
    publicRoutes.map((route) => origin + route).sort(),
  );
  assert.ok(
    !sitemap.html.includes("<lastmod>"),
    "No fabricated modification dates",
  );

  const robots = await get("/robots.txt");
  assert.equal(robots.response.status, 200);
  assert.match(robots.response.headers.get("content-type"), /text\/plain/);
  for (const agent of ["*", "OAI-SearchBot"]) {
    const block = robots.html
      .split(`User-Agent: ${agent}\n`)[1]
      ?.split(/\n\n/)[0];
    assert.ok(block, agent);
    assert.match(block, /Allow: \/\n/);
    for (const area of ["/api/", "/api-proxy/", "/profile", "/settings"])
      assert.ok(block.includes("Disallow: " + area), agent + " exclusions");
    assert.ok(
      !block.includes("Disallow: /login"),
      "Login must remain crawlable to discover noindex",
    );
  }
  assert.ok(robots.html.includes("Sitemap: " + origin + "/sitemap.xml"));

  const graph = schemas(home).flatMap((schema) => schema["@graph"] || []);
  const business = graph.find((item) => item["@type"] === "RealEstateAgent");
  assert.equal(business?.address.postalCode, "700156");
  assert.equal(business?.contactPoint.length, 3);
  assert.equal(business?.sameAs.length, 4);
  assert.ok(graph.some((item) => item["@type"] === "WebSite"));
  const serviceGraph = schemas(services).flatMap(
    (schema) => schema["@graph"] || [],
  );
  assert.equal(serviceGraph.length, 4);
  for (const service of serviceGraph) {
    assert.equal(service["@type"], "Service");
    assert.ok(
      services.includes(`id="${service.url.split("#")[1]}"`),
      "Service anchor exists",
    );
    assert.equal(service.provider["@id"], business["@id"]);
  }
  assert.ok(
    !JSON.stringify([...graph, ...serviceGraph]).match(
      /"(?:Review|AggregateRating|Offer)"/,
    ),
    "No sample reviews/offers in structured data",
  );
  assert.match(home, /id="testimonials"[^>]*data-nosnippet/);
  assert.match(home, /href="\/sell"/);

  for (const route of ["/dashboard", "/seo-nonexistent-route"]) {
    const { response, html } = await get(route);
    assert.equal(response.status, 404, route);
    assert.match(meta(html, "robots"), /noindex/);
    assert.equal(
      canonical(html),
      undefined,
      "404 must not inherit Home's canonical",
    );
  }
  for (const asset of [
    "/images/OG.webp",
    "/logo2.png",
    "/about/officeExterior.webp",
  ]) {
    const response = await fetch(base + asset);
    assert.equal(response.status, 200, asset);
    if (asset === "/images/OG.webp") {
      assert.match(response.headers.get("content-type"), /image\/webp/);
    }
    await response.arrayBuffer();
  }

  const result = {
    checkedAt: new Date().toISOString(),
    base,
    canonicalOrigin: origin,
    checks,
    sitemapUrls: urls,
    robots: robots.html,
    structuredDataTypes: [...graph, ...serviceGraph].map(
      (item) => item["@type"],
    ),
    scope:
      "Local production HTTP/SSR verification; not deployment, indexing, ranking or backend validation.",
  };
  fs.writeFileSync(
    path.join(__dirname, "verification.json"),
    JSON.stringify(result, null, 2) + "\n",
  );
  console.log(
    `Passed: ${checks.length} route/query checks; sitemap, both crawler groups, business/services schema, assets and 404 behavior.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
