# Buy page redesign

The Buy page retains filters because neighbourhood, budget, home type, bedrooms, possession status, and amenities help buyers narrow their shortlist. The visual direction follows the redesigned interior pages: spacious light surfaces, charcoal text, an editorial italic headline, gold actions, and large property photographs.

## Structure and behavior

- `app/buy/page.tsx` renders the heading, search, filtered results, active-filter links, pagination, and shared CTA on the server. It awaits Next.js 16's promised `searchParams` and uses `connection()` for request-time rendering.
- Small reusable components under `components/buy/` handle search, the filter panel, price control, cards, results controls, and pagination. Client code is limited to mobile expansion, the range control, sorting, and the grid/list toggle.
- Search and filter forms submit GET requests. Multiple neighbourhoods match any selected neighbourhood; amenities must match all selections. Sorting and pagination preserve filters. Individual chips remove one filter; reset clears the search. Invalid parameters are normalized and page numbers are bounded.
- Existing landing-page search values are accepted, including `3bhk`, `4bhk` (4+ bedrooms), and its budget ranges. The landing page source was not edited.
- Cards link to Contact with the Buy purpose and property name prefilled. No enquiry is sent merely by browsing or clicking a card.
- Desktop uses a sticky, independently scrollable sidebar; smaller screens use an expandable Filters panel. Images use responsive Next Image sizing. Focus states, reduced-motion rules, and touch-friendly arrow visibility are provided. All colors use existing semantic theme tokens; light mode remains active.

## Inventory and preservation

The original eight sample records retain their exact titles, prices, locations, descriptions, bedroom copy, sizes, and amenity copy. Filter metadata is derived from those records. Six records appear per page, with real counts and two pages for the complete collection.

There is no property-listing API in this project. Existing generated images are illustrative and the page explicitly tells visitors to confirm availability, pricing, and photographs with the team. Dead enquiry anchors and inactive favorite controls were replaced by working enquiry links. The old Buy components remain untouched but are no longer used by this route.

The landing page, privacy text, and terms text were left unchanged. `/buy` was added to the shared redesigned-route list to reuse its header and footer.

## Verification

- Production webpack build and scoped ESLint passed.
- `node output/buy/verify-buy.cjs` checks original record preservation, every filter family, combined queries, sorting, URL round trips, landing search values, invalid input, resets, and enquiry destinations.
- Browser checks passed for budget search, multiple neighbourhoods with possession status, multiple amenities, keyboard-operated price cap, empty results, price sorting, list layout, pagination, and Contact prefilling.
- Responsive checks at 320, 390, and 768 pixels found no horizontal overflow. Mobile filtering collapses after a submitted search. Desktop review used the browser's normal viewport.
- A temporary static SSR snapshot confirmed dark backgrounds, light text, and the gold accent without changing the active site theme; the temporary public file was removed.
- Mobile Lighthouse: performance 92, accessibility 100, best practices 96, SEO 100; CLS 0, LCP 3.3 seconds, total blocking time 120 ms. The best-practices console warning is the existing unauthenticated account check returning HTTP 401.
- All 24 landing baseline files match their saved hashes. The existing legal-copy comparison passes for all 137 rendered text/link items. Scoped diff whitespace checks pass; unrelated pre-existing whitespace remains elsewhere in the working tree.

Visual evidence and the Lighthouse report are in `output/buy/`.
