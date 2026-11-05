# Rental catalogue API

Implemented 4 November 2026 at the user's request, replacing Rent's illustrative collection while preserving its Buy-matching layout. Earlier Rent/sample notes describe historical source.

## Data and filters

Read the public [OpenAPI contract](https://backend.dreamkey-crm.workers.dev/openapi.json) for `GET /v1/website/properties/list`. Requests set `pricingType=RENT`, city Kolkata, page and limit 6. Supported parameters are search, locationArea, propertyType, bedrooms, maxPrice in INR, sortBy and sortOrder. Existing four UI caps are ₹30,000/₹50,000/₹75,000/₹1,00,000; they never use Buy's crore conversion. The sidebar maximum and top cap combine using the lower amount. Furnishing is not in the public response/filter contract and is not fabricated.

`components/pages/rental-filters.ts` owns bounded query normalization, API mapping, chips and Rent URLs. `getRentalCatalogue` in `lib/website-properties.server.ts` uses the existing request-local React cache, no-store fetch, 15-second abort and public card schema. Visitor cookies are not forwarded. Oversized page numbers are corrected using backend pagination. A response containing a Sale record is rejected rather than silently mixing inventory or misrepresenting totals. Failures/empty results render retry/reset/contact choices; sample data is never substituted.

`app/rent/page.tsx` stays a request-time Server Component with meaningful initial HTML. Native GET forms support progressive enhancement; only Radix controls, sidebar state, budget slider and grid/list/sort interaction use client components. Metadata and page fetches share the cached adapter. Filtered canonical/OG URLs use `/rent`, omitting visitor free text, and are noindex; normal pagination has appropriate canonical URLs. The base Rent description now refers to actual API inventory.

## Cards, access and styling

RentalCard wraps the shared Buy card with `rent_catalogue`, live UUID and rent analytics context. It shows API name, availability, photograph, beds/baths, labelled area, amenities and price. The amount is labelled Rent; no undocumented billing period, furnishing, stock photos or measurements are invented. Historical illustrative data/assets remain unmounted.

The Rent layout mounts the existing scoped PropertyAccessProvider. Cards use PropertyLink and the existing branded pending indicator. Anonymous visitors see the same login/OTP popup; successful login continues to the shared `/buy/{uuid}` detail route. Existing backend authorization and client-mount interest recording remain the only full-detail/interest path. Prefetch, SSR and cancelled anonymous clicks do not post interest. Rental details link back to `/rent` and label the amount Rent; Sale behavior is preserved.

The shared Buy/Rent radio CSS removes native appearance and the dark selected ring. Selected rings/dots use theme gold, keyboard focus stays visible and forced-colors uses native appearance.

## Evidence and limits

Production webpack build including TypeScript, scoped ESLint and diff checks pass. `output/rent-api/` contains seven focused actual-source cases, five loopback HTTP/SSR cases, browser records and screenshots. The ten existing shared property/auth regressions also pass. Source/HTTP checks cover monthly INR caps, pagination, category guards, errors, DTO privacy, cookie gates and no SSR interest; no actual customer session was used.

A read-only public GET returned one rental, Uniworld City - Gardens at ₹42,000. Its public facts and anonymous popup were verified in the local frontend. These are backend-supplied values, not independent verification of availability or photographs. Local Chromium checks cover desktop/mobile, filtering, pagination, list view and gold radio styling, including no horizontal overflow at 320/390/768/1440/1920px. No production frontend test, authenticated live detail/interest acceptance, lead submission, commit, push or deployment was performed.
