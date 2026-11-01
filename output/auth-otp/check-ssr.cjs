// Read-only HTTP checks against an already running local production build.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const origin = process.env.DREAMKEY_TEST_ORIGIN || "http://127.0.0.1:3033";
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(origin)) {
  throw new Error("This check requires a loopback origin.");
}
(async () => {
  const pages = await Promise.all(
    ["/login", "/register", "/forgot-password"].map(async (route) => {
      const response = await fetch(origin + route);
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.match(html, /name="robots" content="noindex/);
      assert.match(html, /aria-label="Account access"/);
      assert.match(html, /id="account-form"/);
      assert.equal((html.match(/<header\b/g) || []).length, 1);
      assert.equal((html.match(/<footer\b/g) || []).length, 1);
      assert.equal((html.match(/<h1\b/g) || []).length, 1);
      assert.ok(!html.includes('aria-label="Enquire now on WhatsApp'));
      const names = [...html.matchAll(/<input\b[^>]*name="([^"]+)"/g)].map(
        (match) => match[1],
      );
      assert.deepEqual(
        names,
        route === "/register"
          ? ["name", "email", "password"]
          : route === "/login"
            ? ["email", "password"]
            : ["email"],
      );
      if (route === "/login") assert.match(html, /href="\/forgot-password"/);
      if (route === "/forgot-password") {
        assert.match(html, /Send reset code/);
        assert.match(html, /https:\/\/www\.dreamkeykol\.com\/forgot-password/);
      }
      return {
        route,
        status: response.status,
        names,
        noIndex: true,
        standaloneShell: true,
      };
    }),
  );
  const sitemap = await (await fetch(origin + "/sitemap.xml")).text();
  assert.equal((sitemap.match(/<loc>/g) || []).length, 10);
  assert.ok(!sitemap.includes("forgot-password"));
  assert.ok(!sitemap.includes("/login") && !sitemap.includes("/register"));
  const withCookie = await fetch(origin + "/forgot-password", {
    headers: { Cookie: "access_token=local-check" },
    redirect: "manual",
  });
  assert.equal(
    withCookie.status,
    200,
    "Recovery stays reachable with stale cookies",
  );
  for (const route of ["/login", "/register"]) {
    const response = await fetch(origin + route, {
      headers: { Cookie: "access_token=local-check" },
      redirect: "manual",
    });
    assert.equal(response.status, 307);
    assert.equal(
      new URL(response.headers.get("location"), origin).href,
      origin + "/",
    );
  }
  const result = {
    pages,
    publicSitemapUrls: 10,
    recoveryExcludedFromSitemap: true,
    recoveryReachableWithCookie: true,
    existingAuthRedirectsPreserved: true,
    scope: "Local production SSR/GET only; no backend authentication requests.",
  };
  fs.writeFileSync(
    "output/auth-otp/production-verification.json",
    JSON.stringify(result, null, 2) + "\n",
  );
  console.log(JSON.stringify(result, null, 2));
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
