// Local SSR/HTTP rental integration against mock-backend.cjs on port 4189.
// Configure the preview's API_URL to that loopback fixture; never run against CRM.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const origin = process.env.DREAMKEY_TEST_ORIGIN || "http://127.0.0.1:3064";
if (!/^http:\/\/127\.0\.0\.1:\d+$/.test(origin))
  throw new Error("Loopback preview required");
const fixture = "http://127.0.0.1:4189";
const id = (n) => `20000000-0000-4000-8000-${String(n).padStart(12, "0")}`;
const checks = [];
async function state() {
  return (await fetch(`${fixture}/__mock/state`)).json();
}
async function control(route, body = {}) {
  const response = await fetch(fixture + route, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  assert.equal(response.status, 200);
}
async function page(route, headers = {}) {
  const response = await fetch(origin + route, { headers, redirect: "manual" });
  return { status: response.status, html: await response.text() };
}
async function check(name, fn) {
  await fn();
  checks.push(name);
}
const hasCard = (html, number) => html.includes(`/buy/${id(number)}`);
(async () => {
  await control("/__mock/reset");
  try {
    await check(
      "Rent SSR renders live rental inventory and six-card RENT pagination without sale/sample leakage",
      async () => {
        const result = await page("/rent", {
          Cookie: "access_token=local-rent-verified",
        });
        assert.equal(result.status, 200);
        assert.ok(result.html.includes("Rental Fixture Residence 1"));
        assert.ok(hasCard(result.html, 1));
        assert.ok(hasCard(result.html, 6));
        assert.ok(!hasCard(result.html, 7));
        for (const forbidden of [
          "Sale Fixture Residence",
          "Room for a slower morning",
          "Illustrative monthly rent",
          "PRIVATE_OWNER_DO_NOT_RENDER",
          "PRIVATE_RENTAL_CRM_NOTE",
          "sample collection",
        ])
          assert.ok(!result.html.includes(forbidden), forbidden);
        const requests = (await state()).lists;
        assert.ok(
          requests.length > 0,
          "Preview must use the loopback rental fixture",
        );
        assert.ok(
          requests.every(
            ({ query, cookie }) =>
              query.pricingType === "RENT" && cookie === null,
          ),
        );
      },
    );
    await check(
      "Rent page two and oversized-page clamping use rental totals and preserve missing-image fallback",
      async () => {
        for (const route of ["/rent?page=2", "/rent?page=9999"]) {
          const result = await page(route);
          assert.equal(result.status, 200);
          assert.ok(result.html.includes("Rental Fixture Residence 7"));
          assert.ok(hasCard(result.html, 7));
          assert.ok(!hasCard(result.html, 1));
          assert.ok(result.html.includes("Photograph on request"));
          assert.ok(!result.html.includes("Sale Fixture Residence"));
        }
        const requests = (await state()).lists;
        assert.equal(requests.at(-1).query.page, "2");
      },
    );
    await check(
      "rent caps, neighbourhood, bedrooms and sorting reach backend in raw INR",
      async () => {
        await control("/__mock/reset");
        const result = await page(
          "/rent?type=FLAT&location=new-town&budget=30000&bedrooms=2&sort=price-low",
        );
        assert.ok(hasCard(result.html, 1));
        assert.ok(!hasCard(result.html, 4));
        const { query } = (await state()).lists.at(-1);
        assert.deepEqual(
          {
            type: query.propertyType,
            location: query.locationArea,
            max: query.maxPrice,
            bedrooms: query.bedrooms,
            pricing: query.pricingType,
            sort: query.sortBy,
            order: query.sortOrder,
          },
          {
            type: "FLAT",
            location: "New Town",
            max: "30000",
            bedrooms: "2",
            pricing: "RENT",
            sort: "askingPrice",
            order: "asc",
          },
        );
        assert.equal(query.furnishing, undefined);
        const slider = await page("/rent?maxPrice=50000&sort=price-high");
        assert.ok(hasCard(slider.html, 1));
        assert.ok(hasCard(slider.html, 5));
        assert.ok(!hasCard(slider.html, 6));
        assert.equal((await state()).lists.at(-1).query.maxPrice, "50000");
      },
    );
    await check(
      "empty rental filters preserve a useful reset and unavailable upstream never becomes sample stock",
      async () => {
        const empty = await page("/rent?q=missing-fixture-property");
        assert.ok(empty.html.includes("Clear filters"));
        assert.ok(!hasCard(empty.html, 1));
        await control("/__mock/flags", { listFailure: true });
        const unavailable = await page("/rent");
        assert.ok(unavailable.html.includes("couldn’t load"));
        assert.ok(!hasCard(unavailable.html, 1));
        assert.ok(!unavailable.html.includes("Room for a slower morning"));
        await control("/__mock/flags", {
          listFailure: false,
          ignorePricingType: true,
        });
        // The default first six records happen to be rentals. Requesting the second
        // page forces the ignored category filter to expose a mixed RENT/SALE page.
        const mixed = await page("/rent?page=2");
        assert.ok(mixed.html.includes("couldn’t load"));
        assert.ok(!mixed.html.includes("Sale Fixture Residence"));
        await control("/__mock/flags", { ignorePricingType: false });
      },
    );
    await check(
      "rental UUID details preserve login gating, sanitized authenticated SSR and zero SSR interest",
      async () => {
        for (const headers of [{}, { Cookie: "access_token=invalid" }]) {
          const anonymous = await page(`/buy/${id(1)}`, headers);
          assert.equal(anonymous.status, 200);
          assert.ok(anonymous.html.includes("Log in to continue"));
          assert.ok(!anonymous.html.includes("Rental Fixture Residence 1"));
        }
        const detail = await page(`/buy/${id(1)}`, {
          Cookie: "access_token=local-rent-verified",
        });
        assert.equal(detail.status, 200);
        assert.ok(detail.html.includes("Rental Fixture Residence 1"));
        assert.ok(detail.html.includes("Fixture Builder"));
        assert.ok(detail.html.includes('href="/rent"'));
        assert.ok(!detail.html.includes("Asking price"));
        for (const value of [
          "PRIVATE_OWNER_DO_NOT_RENDER",
          "PRIVATE_RENTAL_CRM_NOTE",
        ])
          assert.ok(!detail.html.includes(value));
        const current = await state();
        assert.equal(current.attempts.length, 0);
      },
    );
    const result = {
      passed: checks.length,
      checks,
      scope:
        "Local production HTTP/SSR using 127.0.0.1:4189 synthetic rental data. No external account, authenticated backend request or real interest mutation.",
    };
    fs.writeFileSync(
      "output/rent-api/http-verification.json",
      JSON.stringify(result, null, 2) + "\n",
    );
    console.log(JSON.stringify(result, null, 2));
  } finally {
    await control("/__mock/reset");
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
