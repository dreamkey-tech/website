# Website properties API and access

Implemented 1 November 2026. Scope: Buy catalogue, authenticated listing details, login popup and interest recording. Landing/Rent inventory, enquiry delivery and business/legal copy were not migrated.

Subsequent inventory integrations: Home Best properties is recorded in `best-properties-api.md`; the user-authorized live RENT-only catalogue (4 November 2026) is recorded in `rental-properties-api.md`. Those updates supersede this original scope statement for Home/Rent, while reusing the detail/access protections below.

## Contract and evidence

Read [Swagger](https://backend.dreamkey-crm.workers.dev/docs) and its public [OpenAPI document](https://backend.dreamkey-crm.workers.dev/openapi.json). A read-only `list?pricingType=SALE&page=1&limit=2` request returned HTTP 200, five total sale records and documented card fields. No authenticated live request or interest POST was made. API records are data supplied by the backend, not independent verification of actual availability or photographs.

| Endpoint | Access | Frontend use |
| --- | --- | --- |
| GET `/v1/website/properties/list` | Public | Server-rendered sale cards, filters, sorting and pagination. |
| GET `/v1/website/properties/list/{id}` | Website customer cookie/token | Full sanitized specs/media, only after backend authorization. |
| POST `/v1/website/properties/list/{id}/click` | Website customer cookie/token | Records an actual authorized page opening. No body/identity fields are added. |

List parameters: `page`, `limit` (max 50), `search`, `locationArea`, `city`, `propertyType` (`FLAT/LAND/WAREHOUSE/COMMERCIAL/OTHER`), `pricingType`, `minPrice`, `maxPrice` (INR), `bedrooms`, `sortBy`, `sortOrder`. UI uses six results per page, SALE and Kolkata; newest, price and carpet-area sorts map to the documented fields. Request-local memoization avoids duplicate catalogue work between metadata and page rendering. Requests use `no-store` with a 15-second timeout.

One neighbourhood is selected because the endpoint accepts one `locationArea`. The old possession-status and amenity controls are not offered: the backend does not document those filters. Availability/amenities remain visible. Existing hero location/budget/BHK values and apartment alias are supported; villa/penthouse/studio subtypes are not documented backend filters and were not invented. Landing's options remain unchanged. Conflicting minimum/maximum prices produce an empty result without asking the backend to process an invalid range.

## Authorization, continuation and tracking

Cards are public previews. An ordinary anonymous click opens a native login/register dialog; modifier/new-tab/download navigation is preserved. A direct property URL renders a meaningful login gate and opens the same modal on hydration. Without JavaScript it exposes a normal Login link carrying the return target.

The detail Server Component forwards only known website/Better Auth session cookies to the configured backend. No cookies means no protected fetch. 401/403 means login; 404 means not found; network/malformed responses show retry. A valid-looking cookie cannot unlock a page unless the backend accepts it. Unknown CRM fields never enter rendered props. Protected details have generic public metadata, `noindex, follow`, and no sitemap entries.

The modal reuses the existing OTP signup/login implementation; there is no second authentication implementation. Verification success updates auth state and resumes `/buy/{id}`. Optional return destinations are validated against a fixed same-origin URL; account routes, recovery links, Google callbacks and cookie redirects preserve them. Default destinations without a return parameter remain unchanged. Google consent/provider compatibility with the website-property guard is not newly verified. The registration endpoint's pre-verification session issue remains a backend follow-up described in `auth-otp.md`.

`PropertySession` schedules interest after the authorized page actually mounts, once per page opening. Its synchronous guard and deferred-effect cleanup prevent Strict Mode duplicate sends. SSR, metadata generation, link prefetch, anonymous card clicks and canceled unmounted views do not post. A reload/new opening is a new view. Failures expose an explicit retry; 401/403 hides the detail UI and opens login. The API response's user email/click metadata is not logged or persisted. Delivery/idempotency beyond the documented endpoint is backend-owned; a network failure can be ambiguous, so no automatic retry loop is added.

The backend owns user identity, authorization, IP/user-agent attribution and record creation. Browser POSTs use the existing same-origin Axios proxy and credentials; no token is read into JavaScript, and no user ID/email/IP is fabricated in the payload.

## Data and media

Runtime schemas whitelist card/detail fields and strip CRM extras before rendering. Display uses actual asking prices, bedroom/bathroom/balcony counts, separate carpet and super built-up areas, floors (including floor 0), builder/year/units, availability/date, pincode and UUID reference. Unknown fields remain unconfirmed; missing/broken photos show a neutral request-photo fallback. No sample unit measurements, amenities, prices, reviews or compliance guarantees are added. A rental ID can display its stated pricing type, without inventing a rent interval.

The detail endpoint defines `media` only as an array of objects. The property-create schema documents `category`, `url`, `mimeType`, `title`, `order`, `isCover` and storage metadata. **Conservative inference:** detail entries using those public fields are mapped after runtime validation. Only image PHOTOGRAPH entries and image/PDF FLOOR_PLAN entries are retained, with HTTPS credential-free URLs; storage keys, unrelated categories and unknown fields are omitted. Unsupported entries are skipped rather than exposing raw objects. Confirm this mapping against a real sanitized customer response. Frontend category filtering is not a substitute for backend private-file authorization.

Photos are deduplicated and the gallery adapts to the number supplied, showing up to five mosaic tiles and all photos in its native lightbox. Supplied floor plans open with safe new-tab attributes; otherwise Contact requests a plan. No invented exact pin or distance is shown: the map remains an area overview. The sole business phone and existing enquiry/WhatsApp behavior are preserved.

## Files and design

- `lib/website-properties.ts`: schemas, safe public URLs, labels/formatting/links.
- `lib/website-properties.server.ts`: fresh public catalogue and authorized detail data access.
- `api/properties.ts`: authenticated click adapter, no automatic side effects.
- `components/buy/website-filters.ts`, `BuySearch`, `BuyFilters`, `BuyResults`, `BuyPagination`, `BuyCard`, `BuyCatalogueError`: API-backed catalogue UI.
- `app/buy/layout.tsx`, `PropertyAccessProvider`, `PropertyLink`, `PropertyLoginRequired`, `PropertySession`: scoped access/popup/tracking.
- `LivePropertyDetails`, `PropertyGallery`, `ListingImage`, `PropertyLoadError`, shared map/enquiry components: detail UI.
- `lib/auth-return.ts`, account route props, auth components and `proxy.ts`: safe continuation through every auth entry point.

The existing `/buy/[slug]` folder handles UUID URLs; old sample-name URLs redirect to `/buy`, since sample records have no corresponding CRM ID. Legacy sample helpers/assets are retained for unchanged surfaces and historical evidence.

Design audit: targeted preservation of the existing editorial light interface, local Jakarta/Playfair fonts, Phosphor icons, gold `#df9e04`, neutral text, rounded photographs and semantic future-dark tokens. Dials remain variance 5, motion 3, density 4. No new dependency, generated inventory imagery, theme toggle, new scroll animation or decorative motion. Native dialog provides top-layer focus trapping/Escape; cancel restores focus. Popup sizing uses explicit viewport bounds; small/short screens scroll within it. Physical mobile keyboards and future-dark appearance were not exercised.

## Verification and limits

- Production `npm run build -- --webpack`, TypeScript, scoped ESLint and whitespace checks pass. The build required escalation because sandboxed Next child-process capture returned empty TypeScript output; no compiler/config workaround was committed.
- `node output/website-properties/check-source.cjs`: ten checks run real models, adapters, server data access and React components/hooks in jsdom with isolated Axios/fetch. Covers safe DTOs/media, filter units/aliases, backend authorization, redirects, popup OTP resume, SSR/no-click, Strict Mode and tracking errors/retry. jsdom cannot perform real navigation; the modifier-click default is asserted, while browser navigation is checked separately.
- `node output/website-properties/check-http.cjs`: ten HTTP checks through a loopback fixture; includes real production SSR, filtering/page clamping, errors/empty states, privacy of anonymous/forged-cookie requests, sanitized authorized HTML/RSC, no SSR/prefetch clicks, not-found/sample redirects and safe return targets. Set `DREAMKEY_TEST_ORIGIN` for a different loopback port. The fixture must be running on port 4188.
- Existing fifteen `output/auth-otp/check-auth.cjs` checks pass, preserving OTP/signup/reset/Google default behavior.
- Final read-only production GET against the configured live public backend renders five cards and keeps anonymous details gated (`live-public-verification.json`). This does not exercise a real customer's authenticated detail or click acceptance.
- Production Buy Lighthouse accessibility 100 / best practices 96. Only existing console findings: anonymous `me` HTTP 401 and local Vercel analytics script HTTP 404. Audit is read-only; it opens no listing and sends no interest. This is not a performance/field Core Web Vitals claim (`lighthouse-buy.json`, `lighthouse-summary.json`).
- Browser, mock backend only: anonymous card modal, close/focus restoration, bad OTP/retry, exact property continuation, one authenticated interest request, gallery/thumbnail navigation, direct anonymous gate, viewport fit at 1280×720, 390×844 and 320×568. Screenshots and browser notes are in `output/website-properties/`.
- The fixture has no outbound HTTP or email. `.env` was not changed or copied; an isolated temporary source copy avoided interrupting the user's existing server. An initial preview setup let Next rewrite the TypeScript config; only those preview-generated changes were restored, and subsequent generated files were isolated. No TypeScript/Next config changes remain.

Older sample-only checks and screenshots in `output/property-details/` describe the previous implementation and do not verify these APIs. No live customer detail/interest acceptance, email delivery, external message, commit/push or deployment is claimed. A real test account is still needed for backend end-to-end verification, especially sanitized media and Google session acceptance.
