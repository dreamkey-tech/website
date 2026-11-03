# Home Best properties API

Implemented 3 November 2026, using the public backend OpenAPI contract and a read-only response. Contract: https://backend.dreamkey-crm.workers.dev/docs (`/openapi.json`). The documented alias requested by the user is `GET /v1/best-properties`.

The backend describes this endpoint as selecting up to three records with `isBestProperty` and `showInWebsite` enabled, excluding drafts, archived records and private CRM fields. Its envelope is `{ success: true, properties: [...], total: number }`; card fields match the existing public website listing DTO. A read-only request returned three records: residential sale, commercial sale and residential rent. This establishes the payload shape, not independent confirmation of stock, pricing or image accuracy.

`lib/website-properties.ts` adds `bestPropertiesSchema`, requiring successful responses, a nonnegative integer total and at most three validated public cards. Unknown properties are stripped by the shared whitelist. `lib/website-properties.server.ts` adds `getBestProperties()` using the configured server `API_URL`, fresh `no-store` reads, existing 15-second abort and no forwarded visitor cookies. HTTP/network/configuration/schema failures become a section error; no raw API error or private response object reaches the UI.

`components/home/BestProperties.tsx` preserves the heading, editorial grid and View all properties CTA. Its asynchronous card collection sits inside a local Suspense boundary with reserved card geometry, so the hero and sibling sections do not wait for this request. Order comes from the backend. Empty/error responses show distinct honest messages and never substitute the retained sample catalogue.

`HomePropertyCard.tsx` now takes the sanitized live DTO. Shared formatters produce the actual name, address, asking price and measured area. Sale/rent labels are explicit; there is no unsupported “onwards” or assumed rental billing period. Nullable bedroom/bathroom facts are omitted, and area labels distinguish carpet from super built-up. The shared ListingImage uses the cover/first preview image, otherwise the existing photograph-on-request fallback; unrelated illustrative images are not substituted.

A local PropertyAccessProvider wraps the ready grid. Existing PropertyLink handles anonymous login, OTP continuation, modified clicks and loading feedback. Image/title links select the real UUID detail route. The detail page still owns authenticated CRM interest recording, so this integration adds no interest POST on card display/click. Analytics markers use live UUIDs, transaction type, `inventory_source=live`, `home_featured` impressions and `select_item`, through the existing consented tracker.

Only this section's sample data usage changes. Retained sample records/assets, Rent, the hero, management section and other content remain intact. The grid retains the approved three-card proportions, with responsive handling for smaller selections. Skeletons contain no fake property identifiers or analytics impressions.

Local verification and limits are recorded in `output/best-properties/`. Production frontend/account testing is left to the user. No live authenticated property access, interest POST or enquiry submission is needed for these checks. Publication is a separate user-authorized step.


## Local verification

Nine focused checks pass in `output/best-properties/check-source.cjs`: safe response parsing, no-cookie/fresh GET and failure handling, curated order/count, nullable commercial/rental facts, unsafe/missing image behavior, real UUID/consented analytics metadata, empty/error responses, and actual streamed SSR with a held promise proving the shell is available before the API finishes. The existing ten property/auth/interest regressions also pass. Scoped ESLint, TypeScript, production webpack build and whitespace checks pass.

The local production preview rendered the three public backend records. Browser checks cover desktop and 390 × 844 mobile sizing (345px cards within a 385px document, no horizontal overflow), separate sale/rent descriptions and commercial missing-bedroom behavior. Activating a Home card as an anonymous visitor opens the existing login popup; its recovery link retains the selected real UUID, and closing it returns focus to the card. No credentials were entered and no interest/enquiry POST was sent. Screenshots and browser notes are in `output/best-properties/`. These checks are not production frontend or authenticated delivery verification.
