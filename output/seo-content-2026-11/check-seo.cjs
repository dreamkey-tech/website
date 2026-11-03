// Local production HTTP/SSR checks. No browser, account login, CRM POST or GA request.
// Usage: node output/seo-content-2026-11/check-seo.cjs http://127.0.0.1:3063
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");

const baseURL = new URL(process.argv[2] || "http://127.0.0.1:3063");
assert.ok(
  ["localhost", "127.0.0.1", "[::1]"].includes(baseURL.hostname) &&
    ["http:", "https:"].includes(baseURL.protocol) &&
    !baseURL.username && !baseURL.password,
  "This verifier refuses non-local origins and credentials",
);
const base = baseURL.origin;
const origin = "https://www.dreamkeykol.com";
const approvedImage = origin + "/images/OG.webp";
const publicRoutes = [
  "/", "/buy", "/rent", "/sell", "/services", "/about", "/contact",
  "/careers", "/privacy", "/terms-and-conditions",
];
const authRoutes = ["/login", "/register", "/forgot-password"];
const socials = [
  "https://www.instagram.com/dream_key_kolkata/",
  "https://www.youtube.com/@dream_key_kolkata",
  "https://www.facebook.com/people/Dream-Key-LLP/61594174244288/",
  "https://www.linkedin.com/company/dreamkeykol-reality",
];
const jsdomCache = path.join(os.homedir(), ".npm/_npx");
const jsdomPath = process.env.DREAMKEY_JSDOM_MODULE ||
  fs.readdirSync(jsdomCache)
    .map((entry) => path.join(jsdomCache, entry, "node_modules/jsdom"))
    .find((entry) => fs.existsSync(path.join(entry, "package.json")));
assert.ok(jsdomPath, "Use the existing isolated jsdom tool installation; no package is installed by this check");
const { JSDOM } = require(jsdomPath);
const checks = [];
const warnings = [];
const routePages = new Map();

function absolute(route) { return new URL(route, origin).href; }
async function get(route) {
  const url = new URL(route, base);
  assert.equal(url.origin, base, "All verifier HTTP requests remain local");
  const response = await fetch(url, {
    redirect: "manual",
    headers: { "User-Agent": "Googlebot" },
    signal: AbortSignal.timeout(60000),
  });
  const html = await response.text();
  return { response, html };
}
function parse(html) {
  // Scripts and remote resources never execute/load in this DOM parser.
  return new JSDOM(html, { url: base });
}
function meta(document, key) {
  return document.querySelector(`meta[name="${key}"], meta[property="${key}"]`)?.content;
}
function canonical(document) {
  const links = [...document.querySelectorAll('link[rel="canonical"]')];
  assert.ok(links.length <= 1, "At most one canonical");
  return links[0]?.getAttribute("href");
}
function schemas(document) {
  return [...document.querySelectorAll('script[type="application/ld+json"]')]
    .map((script) => JSON.parse(script.textContent));
}
function nodes(entries) {
  return entries.flatMap((entry) => entry["@graph"] || entry);
}
function isType(node, name) {
  return [node?.["@type"]].flat().includes(name);
}
function allTypes(value, found = []) {
  if (!value || typeof value !== "object") return found;
  if (value["@type"]) found.push(...[value["@type"]].flat());
  for (const child of Object.values(value)) {
    if (Array.isArray(child)) child.forEach((item) => allTypes(item, found));
    else if (child && typeof child === "object") allTypes(child, found);
  }
  return found;
}
function assertNoUnsupportedReview(entries, label) {
  assert.ok(!allTypes(entries).some((type) => ["Review", "AggregateRating", "Offer"].includes(type)), label + " no fabricated review/rating/offer schema");
}
function headingAudit(document, route) {
  const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
    .filter((node) => !node.closest("[data-cookie-consent-root], dialog"))
    .map((node) => ({ level: Number(node.tagName.slice(1)), text: node.textContent.trim().replace(/\s+/g, " ") }));
  assert.equal(document.querySelectorAll("h1").length, 1, route + " exactly one server-rendered h1");
  for (let index = 1; index < headings.length; index++) {
    if (headings[index].level > headings[index - 1].level + 1)
      warnings.push({ route, concern: "heading-level jump", from: headings[index - 1], to: headings[index] });
  }
  return headings;
}
function metadata(document, route, expectedCanonical, noindex) {
  const title = document.title;
  const description = meta(document, "description");
  assert.ok(title?.trim(), route + " title");
  assert.ok(description?.trim(), route + " description");
  assert.equal(document.querySelectorAll('meta[name="description"]').length, 1, route + " one description");
  assert.equal(new URL(canonical(document)).href, new URL(expectedCanonical).href, route + " canonical");
  assert.equal(meta(document, "og:title"), title, route + " OG title");
  assert.equal(meta(document, "og:description"), description, route + " OG description");
  assert.equal(new URL(meta(document, "og:url")).href, new URL(expectedCanonical).href, route + " OG URL");
  assert.equal(meta(document, "og:type"), "website", route + " OG type");
  assert.equal(meta(document, "og:image"), approvedImage, route + " approved OG image");
  assert.equal(meta(document, "og:image:width"), "1920");
  assert.equal(meta(document, "og:image:height"), "862");
  assert.equal(meta(document, "og:image:type"), "image/webp");
  assert.equal(meta(document, "twitter:card"), "summary_large_image");
  assert.equal(meta(document, "twitter:title"), title);
  assert.equal(meta(document, "twitter:description"), description);
  assert.equal(meta(document, "twitter:image"), approvedImage);
  for (const key of ["robots", "googlebot"]) {
    const directives = meta(document, key);
    assert.ok(directives, route + " " + key);
    assert.match(directives, noindex ? /\bnoindex\b/ : /(?:^|,\s*)index(?:,|$)/, route + " indexing");
    if (!noindex) assert.ok(!directives.includes("noindex"), route + " no accidental noindex");
    assert.match(directives, /(?:^|,\s*)follow(?:,|$)/, route + " follow links");
  }
  return { title, description, canonical: canonical(document), robots: meta(document, "robots") };
}

async function main() {
  const titles = new Set();
  const descriptions = new Set();
  for (const route of [...publicRoutes, ...authRoutes]) {
    const { response, html } = await get(route);
    assert.equal(response.status, 200, route);
    const dom = parse(html);
    try {
      const document = dom.window.document;
      const info = metadata(document, route, absolute(route), authRoutes.includes(route));
      assert.ok(!titles.has(info.title), route + " unique title");
      assert.ok(!descriptions.has(info.description), route + " unique description");
      titles.add(info.title);
      descriptions.add(info.description);
      const headings = headingAudit(document, route);
      const structuredData = schemas(document);
      assertNoUnsupportedReview(structuredData, route);
      if (publicRoutes.includes(route)) {
        const graph = nodes(structuredData);
        const pages = graph.filter((node) => ["WebPage", "AboutPage", "ContactPage", "CollectionPage"].some((type) => isType(node, type)));
        assert.equal(pages.length, 1, route + " single WebPage node");
        assert.equal(pages[0].url, absolute(route), route + " WebPage URL");
        const breadcrumbs = graph.filter((node) => isType(node, "BreadcrumbList"));
        assert.equal(breadcrumbs.length, route === "/" ? 0 : 1, route + " breadcrumb count");
        if (breadcrumbs.length) {
          const items = breadcrumbs[0].itemListElement;
          assert.ok(items.length >= 2, route + " breadcrumb trail");
          assert.deepEqual(items.map((item) => item.position), items.map((_, i) => i + 1));
          const first = typeof items[0].item === "object" ? items[0].item["@id"] : items[0].item;
          const final = items.at(-1);
          const last = typeof final.item === "object" ? final.item["@id"] : final.item;
          assert.equal(first, absolute("/"));
          assert.equal(last, absolute(route));
        }
        const footer = document.querySelector("footer");
        assert.ok(footer, route + " footer retained");
        for (const social of socials) {
          const links = [...footer.querySelectorAll("a[href]")].filter((link) => link.getAttribute("href") === social);
          assert.equal(links.length, 1, route + " official social link once: " + social);
          assert.ok(links[0].getAttribute("aria-label") || links[0].textContent.trim(), route + " named social link");
          if (links[0].target === "_blank") assert.match(links[0].rel, /noopener|noreferrer/, route + " secure external link");
        }
      }
      routePages.set(route, { html, structuredData });
      checks.push({ route, status: response.status, ...info, headings, schemaTypes: allTypes(structuredData) });
    } finally { dom.window.close(); }
  }

  // Query canary is synthetic. It must not become a public canonical/OG URL.
  for (const route of [
    "/buy?q=seo-canary%40example.invalid&page=2", "/buy?location=new-town",
    "/buy?sort=price-asc", "/buy?type=FLAT&budget=75-150",
  ]) {
    const { response, html } = await get(route);
    assert.equal(response.status, 200, route);
    const dom = parse(html);
    try {
      const info = metadata(dom.window.document, route, absolute("/buy"), true);
      for (const element of dom.window.document.querySelectorAll("meta,link[rel=canonical],title,script[type='application/ld+json']"))
        assert.ok(!element.outerHTML.includes("seo-canary"), route + " no free-text query reflection in metadata/schema");
      checks.push({ route, status: response.status, ...info });
    } finally { dom.window.close(); }
  }
  for (const route of ["/buy?utm_source=example", "/buy?page=invalid&type=invalid"]) {
    const { response, html } = await get(route);
    assert.equal(response.status, 200, route);
    const dom = parse(html);
    try { checks.push({ route, status: 200, ...metadata(dom.window.document, route, absolute("/buy"), false) }); }
    finally { dom.window.close(); }
  }
  // Derive actual normalized pagination from returned canonical; never assume stock count.
  for (const route of ["/buy?page=2", "/buy?page=9999"]) {
    const { response, html } = await get(route);
    assert.equal(response.status, 200, route);
    const dom = parse(html);
    try {
      const document = dom.window.document;
      const renderedCanonical = new URL(canonical(document));
      assert.equal(renderedCanonical.origin, origin);
      assert.equal(renderedCanonical.pathname, "/buy");
      assert.ok([...renderedCanonical.searchParams.keys()].every((key) => key === "page"));
      const normalizedPage = Number(renderedCanonical.searchParams.get("page") || "1");
      assert.ok(Number.isSafeInteger(normalizedPage) && normalizedPage >= 1 && normalizedPage <= Number(new URL(route, base).searchParams.get("page")));
      const info = metadata(document, route, renderedCanonical.href, false);
      if (normalizedPage > 1) assert.match(info.title, new RegExp("Page " + normalizedPage + "\\b"));
      checks.push({ route, status: 200, normalizedPage, ...info });
    } finally { dom.window.close(); }
  }

  const protectedRoute = "/buy/10000000-0000-4000-8000-000000000001";
  const protectedPage = await get(protectedRoute);
  assert.equal(protectedPage.response.status, 200, "Anonymous detail gate SSR");
  const detailDOM = parse(protectedPage.html);
  try {
    const document = detailDOM.window.document;
    const info = metadata(document, protectedRoute, absolute(protectedRoute), true);
    assert.match(info.title, /Property Details/i);
    assert.ok(!document.querySelector('[data-analytics-impression="detail"]'), "No authorized property detail impression for anonymous visitor");
    assert.ok(!document.querySelector('[data-property-id]'), "No protected listing data rendered for anonymous visitor");
    assert.match(document.body.textContent, /log in|sign in/i, "Anonymous login gate retained");
    assertNoUnsupportedReview(schemas(document), protectedRoute);
    checks.push({ route: protectedRoute, status: 200, ...info, scope: "Anonymous gate only; no real auth/detail/interest request" });
  } finally { detailDOM.window.close(); }

  const sitemap = await get("/sitemap.xml");
  assert.equal(sitemap.response.status, 200);
  assert.match(sitemap.response.headers.get("content-type"), /xml/);
  const xml = parse(sitemap.html);
  const sitemapURLs = [...xml.window.document.querySelectorAll("loc")].map((loc) => loc.textContent);
  xml.window.close();
  assert.deepEqual([...sitemapURLs].sort(), publicRoutes.map(absolute).sort(), "Exactly ten public canonical sitemap URLs");
  assert.equal(new Set(sitemapURLs).size, sitemapURLs.length, "No duplicate sitemap URLs");
  assert.ok(!sitemap.html.includes("<lastmod>"), "No fabricated build-time modification dates");
  assert.ok(!sitemapURLs.some((url) => authRoutes.some((route) => new URL(url).pathname === route) || /\/buy\/|dashboard|admin/.test(new URL(url).pathname)), "No auth/private/detail routes in sitemap");
  const robots = await get("/robots.txt");
  assert.equal(robots.response.status, 200);
  assert.match(robots.response.headers.get("content-type"), /text\/plain/);
  for (const agent of ["*", "OAI-SearchBot"]) {
    const block = robots.html.split(`User-Agent: ${agent}\n`)[1]?.split(/\n\n/)[0];
    assert.ok(block, agent + " crawler group");
    assert.match(block, /Allow: \/(?:\n|$)/);
    for (const area of ["/api/", "/api-proxy/", "/profile", "/settings"])
      assert.ok(block.includes("Disallow: " + area), agent + " private exclusions");
    for (const route of [...publicRoutes.filter((route) => route !== "/"), ...authRoutes])
      assert.ok(!block.includes("Disallow: " + route), route + " crawlable to discover indexing metadata");
  }
  assert.ok(robots.html.includes("Sitemap: " + absolute("/sitemap.xml")));

  const homeGraph = nodes(routePages.get("/").structuredData);
  const businesses = homeGraph.filter((node) => isType(node, "RealEstateAgent"));
  assert.equal(businesses.length, 1, "Single existing business entity");
  const business = businesses[0];
  assert.equal(business.name, "DreamkeyKol Reality LLP");
  assert.equal(business.legalName, "DreamkeyKol Reality LLP");
  assert.deepEqual([...business.sameAs].sort(), [...socials].sort());
  assert.equal(business.address.postalCode, "700156");
  assert.equal(business.contactPoint.length, 1, "Single approved contact number");
  assert.equal(business.contactPoint[0].telephone.replace(/\D/g, ""), "917980133881");
  assert.equal(homeGraph.filter((node) => isType(node, "WebSite")).length, 1);
  assert.equal(homeGraph.filter((node) => isType(node, "Organization")).length, 0, "No duplicate separate Organization entity");
  const serviceGraph = nodes(routePages.get("/services").structuredData);
  const services = serviceGraph.filter((node) => isType(node, "Service"));
  assert.equal(services.length, 4, "Four genuine existing service cards");
  const servicesDOM = parse(routePages.get("/services").html);
  try {
    for (const service of services) {
      assert.equal(service.provider["@id"], business["@id"]);
      assert.ok(servicesDOM.window.document.getElementById(new URL(service.url).hash.slice(1)), "Existing service anchor");
    }
  } finally { servicesDOM.window.close(); }
  const homeDOM = parse(routePages.get("/").html);
  try { assert.ok(homeDOM.window.document.querySelector("#testimonials[data-nosnippet]"), "Existing testimonial snippet exclusion retained"); }
  finally { homeDOM.window.close(); }

  for (const route of ["/dashboard", "/seo-nonexistent-route"]) {
    const { response, html } = await get(route);
    assert.equal(response.status, 404, route);
    const dom = parse(html);
    try {
      const directives = [...dom.window.document.querySelectorAll('meta[name="robots"]')].map((node) => node.content).join(",");
      assert.match(directives, /noindex/);
      assert.equal(canonical(dom.window.document), undefined, "404 has no inherited Home canonical");
      checks.push({ route, status: 404, robots: directives });
    } finally { dom.window.close(); }
  }
  for (const asset of ["/images/OG.webp", "/logo2.png"]) {
    const { response } = await get(asset);
    assert.equal(response.status, 200, asset);
    assert.match(response.headers.get("content-type"), asset.endsWith("webp") ? /image\/webp/ : /image\/png/);
  }

  // Check only existing top-level internal navigation routes; no variable API/media URLs.
  const knownRoutes = new Set([...publicRoutes, ...authRoutes]);
  const checkedLinks = new Set();
  for (const [route, entry] of routePages) {
    const dom = parse(entry.html);
    try {
      for (const anchor of dom.window.document.querySelectorAll('a[href^="/"]')) {
        const href = anchor.getAttribute("href");
        if (href.startsWith("//")) continue;
        const url = new URL(href, base);
        if (knownRoutes.has(url.pathname)) checkedLinks.add(url.pathname);
        else if (url.pathname === "/dashboard") assert.fail(route + " retained deleted dashboard navigation");
        else if (!/^(?:\/buy\/[0-9a-f-]{36}|\/api\/|\/api-proxy\/)/i.test(url.pathname))
          warnings.push({ route, concern: "Unverified non-top-level local link", path: url.pathname });
      }
    } finally { dom.window.close(); }
  }
  const result = {
    checkedAt: new Date().toISOString(), base, canonicalOrigin: origin,
    checks, sitemapURLs, robots: robots.html, socialProfiles: socials,
    structuredDataTypes: [...new Set([...routePages.values()].flatMap((page) => allTypes(page.structuredData)))],
    checkedTopLevelLinks: [...checkedLinks].sort(), warnings,
    scope: "Local production HTTP/SSR only. Parser executes no scripts and loads no external resources. No real auth, CRM POST, Google collector, deployment, account access, indexing, ranking, browser geometry or external rich-results validation established.",
  };
  fs.writeFileSync(path.join(__dirname, "seo-verification.json"), JSON.stringify(result, null, 2) + "\n");
  console.log(`Passed ${checks.length} public/auth/query/private/404 route checks; ten sitemap URLs, crawler groups, metadata/social/schema/assets and bounded existing navigation checked. Heading/link warnings: ${warnings.length}.`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
