// Local mock-backed SSR/HTTP checks. Never sends requests to the real CRM.
const fs = require("node:fs"),
  assert = require("node:assert/strict");
const origin = process.env.DREAMKEY_TEST_ORIGIN || "http://127.0.0.1:3031";
if (!/^http:\/\/127\.0\.0\.1:\d+$/.test(origin))
  throw new Error("Loopback origin required");
const fixture = "http://127.0.0.1:4188";
const id = "10000000-0000-4000-8000-000000000001";
const cookie = { Cookie: "access_token=local-property-verified" };
const checks = [];
async function control(path, body = {}) {
  const r = await fetch(fixture + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  assert.equal(r.status, 200);
}
async function page(path, headers = {}) {
  const r = await fetch(origin + path, { headers, redirect: "manual" });
  return {
    status: r.status,
    html: await r.text(),
    location: r.headers.get("location"),
  };
}
async function check(name, fn) {
  await fn();
  checks.push(name);
}
(async () => {
  await control("/__mock/reset");
  await check(
    "public API catalogue, six-card pagination and real UUID routes",
    async () => {
      const p = await page("/buy");
      assert.equal(p.status, 200);
      assert.ok(p.html.includes("Test Riverside Residence 1"));
      assert.ok(!p.html.includes("Test Riverside Residence 7"));
      assert.ok(p.html.includes(`/buy/${id}`));
      assert.ok(!p.html.includes("An illustrative collection."));
      assert.ok(!p.html.includes("DreamKey Altura"));
    },
  );
  await check(
    "supported filters and INR sorting are applied to API, not just visible labels",
    async () => {
      const p = await page(
        "/buy?type=FLAT&location=new-town&budget=75l-1.5cr&bedrooms=2&sort=price-asc",
      );
      assert.equal(p.status, 200);
      assert.ok(p.html.includes("Test Riverside Residence 1"));
      assert.ok(!p.html.includes("Test Riverside Residence 2"));
      const state = await (await fetch(fixture + "/__mock/state")).json();
      const q = state.lists.at(-1);
      assert.deepEqual(
        {
          type: q.propertyType,
          location: q.locationArea,
          min: q.minPrice,
          max: q.maxPrice,
          beds: q.bedrooms,
          sort: q.sortBy,
          order: q.sortOrder,
          pricing: q.pricingType,
        },
        {
          type: "FLAT",
          location: "New Town",
          min: "7500000",
          max: "15000000",
          beds: "2",
          sort: "askingPrice",
          order: "asc",
          pricing: "SALE",
        },
      );
    },
  );
  await check("page clamping and metadata follow API totals", async () => {
    const p = await page("/buy?page=9999");
    assert.equal(p.status, 200);
    assert.ok(p.html.includes("Test Riverside Residence 7"));
    assert.ok(
      p.html.includes(
        'rel="canonical" href="https://www.dreamkeykol.com/buy?page=2"',
      ),
    );
  });
  await check("empty results preserve search with a useful reset", async () => {
    const p = await page("/buy?q=does-not-exist");
    assert.ok(p.html.includes("A different starting point?"));
    assert.ok(p.html.includes("Clear filters"));
  });
  await check(
    "anonymous and forged-cookie detail requests never contain protected data",
    async () => {
      for (const headers of [{}, { Cookie: "access_token=invalid" }]) {
        const p = await page(`/buy/${id}`, headers);
        assert.equal(p.status, 200);
        assert.ok(p.html.includes("Log in to continue"));
        for (const forbidden of [
          "Test Riverside Residence 1",
          "Test Builder",
          "Floor plan",
          "CRM_INTERNAL_DO_NOT_RENDER",
          "PRIVATE_OWNER_PHONE",
        ])
          assert.ok(!p.html.includes(forbidden), forbidden);
      }
    },
  );
  await check(
    "authenticated detail SSR has actual areas/floor/photos and excludes internal fields/private documents",
    async () => {
      const p = await page(`/buy/${id}`, cookie);
      assert.equal(p.status, 200);
      assert.ok(p.html.includes("Test Riverside Residence 1"));
      for (const required of [
        "Ground floor",
        "Carpet area",
        "Super built-up area",
        "Floor plan",
        "Test Builder",
      ])
        assert.ok(p.html.includes(required), required);
      for (const forbidden of [
        "CRM_INTERNAL_DO_NOT_RENDER",
        "PRIVATE_OWNER_PHONE",
        "PRIVATE_PDF_DO_NOT_RENDER",
        "CRM_PRIVATE_BROCHURE",
      ])
        assert.ok(!p.html.includes(forbidden), forbidden);
    },
  );
  await check(
    "server rendering and route prefetch record no interest",
    async () => {
      await page(`/buy/${id}`, {
        ...cookie,
        RSC: "1",
        "Next-Router-Prefetch": "1",
      });
      const s = await (await fetch(fixture + "/__mock/state")).json();
      assert.equal(s.clicks.length, 0);
      assert.equal(s.attempts.length, 0);
    },
  );
  await check(
    "property and catalogue failures show recovery instead of sample fallback",
    async () => {
      await control("/__mock/flags", {
        listFailure: true,
        detailFailure: true,
      });
      const buy = await page("/buy");
      assert.ok(buy.html.includes("We couldn’t load the properties."));
      assert.ok(!buy.html.includes("DreamKey Altura"));
      const detail = await page(`/buy/${id}`, cookie);
      assert.ok(detail.html.includes("We couldn’t load this listing."));
      assert.ok(!detail.html.includes("Test Builder"));
      await control("/__mock/flags", {
        listFailure: false,
        detailFailure: false,
      });
    },
  );
  await check(
    "unpublished/missing listings show not-found and old sample URLs retire safely",
    async () => {
      const missing = await page(
        "/buy/10000000-0000-4000-8000-000000000099",
        cookie,
      );
      assert.ok(
        missing.status === 404 ||
          missing.html.includes("This home isn’t in our collection."),
      );
      const legacy = await page("/buy/dreamkey-altura");
      assert.ok(
        legacy.location === "/buy" || legacy.html.includes("NEXT_REDIRECT"),
      );
      assert.ok(!legacy.html.includes("3 covered spaces"));
    },
  );
  await check(
    "auth returns to intended property and rejects external redirects",
    async () => {
      const returnTo = encodeURIComponent(`/buy/${id}`);
      const own = await page(`/login?returnTo=${returnTo}`, cookie);
      assert.equal(own.status, 307);
      assert.equal(new URL(own.location, origin).pathname, `/buy/${id}`);
      const bad = await page(
        "/login?returnTo=https%3A%2F%2Fevil.example",
        cookie,
      );
      assert.equal(bad.status, 307);
      assert.equal(new URL(bad.location, origin).pathname, "/buy");
    },
  );
  const result = {
    passed: checks.length,
    checks,
    scope:
      "Local HTTP/SSR with loopback fixture. No live authenticated GET or click POST.",
  };
  fs.writeFileSync(
    "output/website-properties/http-verification.json",
    JSON.stringify(result, null, 2) + "\n",
  );
  console.log(JSON.stringify(result, null, 2));
  await control("/__mock/reset");
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
