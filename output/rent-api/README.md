# Rent inventory integration checks

4 November 2026. These scripts exercise actual repository source with synthetic data. They do not create real accounts, send enquiries, record interest in the CRM or establish production availability.

## Focused source checks

Run from the repository root:

```sh
node output/rent-api/check-source.cjs
```

`source-verification.json` records seven passing checks. The checker transpiles the actual rental query helpers, server adapter, shared DTO and React rental card. Only fetch and framework boundaries are adapted. It covers `pricingType=RENT`, supported monthly INR caps, bounded query state, public cookie-free/no-store requests, pagination clamping, wrong-category/error rejection, safe card data and the existing protected-detail boundary. Rendered detail checks confirm rental breadcrumbs return to `/rent` with the Rent caption, while sale details retain `/buy` and Asking price. Card wording uses the API's rent value without inventing an undocumented billing period or furnishing information.

The unchanged shared access regression suite also passes all ten checks:

```sh
node output/website-properties/check-source.cjs
```

That suite covers the login modal, OTP continuation, modifier clicks, private-field/media filtering, authenticated detail fetching and interest recording only after client mount. Its React/jsdom adapters do not establish native browser rendering or live authentication.

## Loopback SSR and browser fixture

`mock-backend.cjs` binds only `127.0.0.1:4189`, performs no outbound requests and serves seven monthly-priced rental records plus three sale records. It deliberately includes a missing photograph and unapproved private fields. The list endpoint supports the documented public filters, sorting and pagination. `ignorePricingType` and `listFailure` flags exercise defensive error behavior. A synthetic `access_token=local-rent-verified` cookie is accepted only by this fixture.

After a production build, start the fixture and a separate local preview in different terminals:

```sh
node output/rent-api/mock-backend.cjs
```

```sh
API_URL=http://127.0.0.1:4189 npm run start -- --hostname 127.0.0.1 --port 3066
```

Then run:

```sh
DREAMKEY_TEST_ORIGIN=http://127.0.0.1:3066 node output/rent-api/check-http.cjs
```

The HTTP checker requires a loopback origin and writes `http-verification.json`. All five checks passed against the local production preview on port 3070. It checks real Next server HTML for rental-only pages, monthly INR filters, rental pagination, empty/error/mixed-category recovery, protected UUID listing routes, private-field exclusion and zero server-rendered interest requests. Fixture control calls reset synthetic state only; flags and recorded calls were reset after verification.

## Native browser and public data check

`browser-checks.json` records local Chromium evidence: gold selected radio border/background with native appearance removed, live rental facts, anonymous listing login popup, six-card fixture pagination, combined New Town/₹50,000 server filtering, grid/list mode, mobile filter submission and collapse, and no horizontal overflow at 1920/1440/768/390/320px. Cookie choices were rejected locally. `desktop-live.png`, `desktop-live-details.png` and `mobile-live.png` show the local frontend using the public API. The read-only public GET returned one rental, Uniworld City - Gardens at ₹42,000; that is backend data, not an independent availability/photo check.

Production webpack build including TypeScript, scoped changed-source ESLint and diff checks pass. Native browser checks use the local frontend; no production frontend acceptance test, credential entry, real lead/interest POST or publication was performed. Authenticated detail markup and return-link assertions use the isolated fixture/source adapters only.
