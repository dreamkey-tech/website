# Buy property detail pages

**1 November 2026:** The sample-only implementation below is historical. Buy now uses the website property API, UUID detail URLs, a login/OTP popup and authenticated interest recording. Old sample detail URLs redirect to the catalogue. See [website-properties-api.md](website-properties-api.md) for current contracts and verification; the original sample HTTP harness below does not verify the new behavior.

Implemented 30 October 2026. The user requested clickable Buy listings with more photographs and property information, using Indian portals for content and Realtor.com as a usability/design reference. This is a frontend extension of the existing illustrative catalogue, not a live inventory integration.

## Reference review and design

- Read [Housing's Urbana New Towers page](https://housing.com/buy-urbana-new-towers-by-shrachi-sureka-emamijb-groupkeventernahata-group-and-government-of-west-bengal-in-east-kolkata-township-kolkata-pid-281712) through web and browser tools. It presents photos, configuration, possession, area, price exclusions, floor plans, amenities and locality information. These informed the information architecture; none of Urbana's prices, specifications, distances, approvals or developer claims were copied into DreamKey listings.
- The user's [Realtor.com reference](https://www.realtor.com/realestateandhomes-detail/285-Main-St-Unit-202_San-Francisco_CA_94105_M92146-39114?property_id=9214639114) was inaccessible in the web reader and showed a request-block/error page in the browser. A direct 99acres listing request was also blocked. Do not describe those pages as successfully reviewed. The implementation interprets the requested usability direction: prominent photos, concise facts, section navigation and a desktop enquiry sidebar.
- Preserve DreamKey's existing gold/neutral light theme, local fonts, rounded images, Phosphor icons, shared navigation/footer and restrained interaction. No new dependency or theme toggle. Design dials: variance 5, motion 3, density 4. Existing semantic `--home-*` tokens retain future-dark compatibility; active dark-mode appearance was not tested.

## Routes and components

`app/buy/[slug]/page.tsx` is a request-rendered Server Component (`connection()`, awaited route params). All eight existing Buy homes have stable title-derived URLs, e.g. `/buy/dreamkey-altura`. Unknown slugs use `notFound()` and the local `not-found.tsx`. The shared shell recognises `/buy/*`, with Buy highlighted in navigation.

Buy card image/title links open details. The separate Enquire/Ask our team link retains its original Contact prefill URL. Buy filters, sorting, grid/list mode, pagination and catalogue values are unchanged. Landing/Rent cards are outside this change and retain their existing destinations.

Small components in `components/property/`:

- `property-data.ts`: enriches existing catalogue records with descriptions, shared illustrative photo metadata, labels and nullable unit specifications. No catalogue duplication or backend fetch.
- `PropertyGallery.tsx`: five-photo desktop mosaic, single-photo mobile entry, native modal dialog with thumbnails, wraparound arrows, keyboard navigation, Escape, focus restoration and scroll-lock cleanup.
- `PropertyOverview.tsx` / `PropertySpecifications.tsx`: beds, baths, area, property type, possession, floor, furnishing, parking, ownership, amenities, price context and a floor-plan request link.
- `PropertyEnquiryPanel.tsx`: desktop sticky panel, Contact enquiry, phone and property-specific WhatsApp links. Waitlisted homes ask about alternatives. Uses the sole approved number `+91 79801 33881`; no enquiry or WhatsApp message is submitted automatically.
- `PropertyLocation.tsx`: neighbourhood-only map loaded on request and an external Maps search. It does not invent a precise property pin or travel distances.
- `PropertyShare.tsx`: native sharing where supported, clipboard fallback and accessible feedback. Native share/clipboard handoff was not exercised in browser verification.
- `Property.module.css`: responsive layout, shared tokens, focus and reduced-motion styles. Modal uses the native top layer; sticky section navigation uses level 2 below the shared header's existing level 40.

## Content and SEO limits

The existing catalogue supplies bedroom ranges, area ranges, starting prices, status and features. Bathroom/balcony counts, carpet area, area basis, floor, furnishing, facing, ownership and possession dates are unknown. They remain nullable and render as “On request” or “Confirm with our team”, not fabricated measurements. The existing Icon sample explicitly mentions three covered parking spaces; no other parking count is invented. Listed area is not silently labelled carpet or super built-up area. Photo and availability disclosures remain visible.

Floor plans/brochures are not available; Request floor plan opens the property-prefilled Contact page instead of pretending to download a document. No EMI/rates, reviews, compliance guarantees or invented amenities were added.

Each detail page has its own title/description, canonical and illustrative social photo. Sample detail pages are intentionally `noindex, follow`, excluded from the existing sitemap and contain no Offer/Review structured data. When real inventory is supplied, review these settings alongside approved unit details, real photos and a backend contract before indexing.

## Generated image provenance

Built-in image generation created a single illustrative bedroom photo. Inspected the output and converted it to WebP without cropping/resizing. Final project asset: `public/images/property/bedroom-v1.webp`, 1448 × 1086, 161,624 bytes. It is a generic supporting concept photo across the illustrative collection, not proof of a particular available home. Existing gallery assets were reused; real client portraits/office imagery were not modified.

Final prompt, built-in tool:

> Use case: photorealistic-natural. Asset type: an illustrative bedroom photograph for DreamKey's Kolkata residential property detail gallery. Primary request: professionally photographed airy contemporary Kolkata apartment bedroom, a low upholstered oatmeal king bed with white cotton bedding, warm oak bedside tables and wardrobe, off-white walls, pale stone floor, a large clear window on the right overlooking believable distant Kolkata high-rise residential towers with plain balconies and no rooftop or balcony plants. Calm natural daytime light, realistic furniture proportions, restrained modern Indian luxury, wide landscape composition at room eye level from the doorway, approximately 4:3 frame. No people, no logo, no text, no watermark, no houseplants, no exaggerated resort styling. A single full-frame photograph, not a collage. This is conceptual illustrative property imagery, not a real listing.

## Verification

- Scoped ESLint and production webpack build, including TypeScript, passed.
- Existing `output/buy/verify-buy.cjs` passes catalogue/filter/sort/query/pagination and enquiry URL regression checks.
- `output/property-details/check-property-details.cjs` verifies all eight production detail URLs, Buy image/title links across both pages, retained enquiry links, canonical/noindex, disclosures, sections, missing-record handling, sitemap exclusion and WebP delivery. Results: `verification.json` alongside the script. No live inventory or enquiry submission is involved.
- Supported browser checks: Buy card navigation to Altura; modal next/previous, keyboard arrows, bedroom thumbnail, Escape/focus restoration and scroll unlock; phone gallery/CTA; no horizontal document overflow at 320, 390, 768 and 1024px and the default desktop width. Viewport override reset. Explore the neighbourhood mounts the correctly labelled, regional Google Maps iframe; the local enquiry link opens Contact with “DreamKey Altura” in the message. No external call/message or form submission was made. Screenshots: `output/property-details/desktop.png`, `overview.png` and `mobile.png`.
- Mobile Lighthouse: performance 79, accessibility 100, best practices 96, SEO 69; LCP about 3.9s, CLS 0, total blocking time 370ms. SEO is intentionally reduced by sample `noindex`. Console findings are existing anonymous `/api-proxy/v1/user/auth/me` 401 and the locally unavailable Vercel analytics script 404. These lab results are not field performance, ranking or deployment evidence. Audit: `output/property-details/lighthouse-mobile.json`.

No commit/push or deployment is included in this feature request.
