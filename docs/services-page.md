# Services page

Redesign of `/services`, with copy grounded in the 17-page founder interview supplied on 9 October 2026. The source describes itself as a founder-perspective draft and explicitly flags operational details that still need confirmation. Those distinctions are retained when choosing what to claim on the website.

## Audit and design direction

The old page used a dark centred hero, ten largely overlapping icon cards, an inverted reasons section and three closing actions. It inherited the legacy header/footer and linked to obsolete landing-page contact/sell anchors. It also described commercial inventory and property marketing channels more broadly than the new source supports. There was no services-specific metadata.

The approved direction is the existing light editorial design: `#df9e04` accents, neutral text, locally hosted Plus Jakarta Sans with the established Playfair italic headline treatment, 24px image corners and pill actions. Design variance 6, motion intensity 2, visual density 3. Native CSS modules and existing Phosphor icons provide the foundation. Motion is limited to link feedback, with a reduced-motion fallback; the content never depends on hover.

The page has a property-consultation image hero (updated 10 October 2026 from the earlier neighbourhood image), a two-column service collection, a partner-network section, an approach section, native expandable FAQs and the shared enquiry CTA. The hero uses newly generated illustrative imagery; remaining images are existing illustrative brand assets, not photographs of confirmed listings or the actual office. The page uses the shared interior navigation/footer by adding `/services` to the route selector. No landing-page source or shared visual styles are changed. The existing header height and established serif usage are retained for consistency with the user's approved pages.

## Content grounding

| Website content                                                 | Source sections / pages       | Scope                                                                            |
| --------------------------------------------------------------- | ----------------------------- | -------------------------------------------------------------------------------- |
| Buying, renting, selling, investment and real estate consulting | 2, pages 2–4; 17, pages 16–17 | Confirmed service categories; investment and general consultation share one card |
| Requirements before options                                     | 6–7, pages 7–9                | Approach, not a guaranteed transaction workflow or service-level promise         |
| Sharing property information to reach potential buyers          | 8, pages 9–10                 | No claim of paid campaigns, professional valuation or buyer screening            |
| Broker and consultant collaboration                             | 9, pages 10–11                | No invented partner count, exclusive inventory or automated lead distribution    |
| Selected East, South and North Kolkata areas                    | 3 and 10, pages 4 and 11      | No assertion of complete neighbourhood coverage                                  |
| Considered decisions and customer-focused communication         | 12 and 15, pages 12–15        | Values, without unsupported competitor comparisons                               |

The page makes no new claim about legal/document verification, guaranteed returns, formal valuations, exact response times, transaction closing, post-deal support or full property management. Commercial properties, land and developer partnerships are not advertised as confirmed offerings. No invented statistics, testimonials or attributed founder quotes are added. Existing legal content and global company claims remain outside this services-page change.

## Implementation and verification

The route awaits `connection()` for request-time server rendering, as requested for the site. All new service components render on the server; existing navigation supplies its own small client interaction. FAQ interaction uses native `details`/`summary` with no new browser JavaScript. Content and destination links are maintained in `components/services/services-content.ts`.

Mobile CSS stacks the hero and collection at 640px, collapses the network and approach sections, reserves image dimensions and uses the existing focus styles. All new surfaces use shared semantic theme tokens, so a future dark theme can reuse the established token overrides. The site remains explicitly light today.

Live screenshot and interaction verification is blocked by the preview browser's existing unsupported connection-error `data:` URL. Build, scoped lint, production response and accessibility checks are recorded under `output/services-page/`; this limitation does not prevent source or HTTP verification.

Final verification passed: production webpack build and TypeScript, scoped ESLint, Prettier and whitespace checks. `/services` is dynamic SSR. The production response contains one H1, all four service categories, four native FAQs, an active Services navigation link, unique IDs, resolved anchors and image alt attributes. All five local image files exist. Calculated text contrast meets AA on the light and future-dark token pairs (minimum 4.59:1); dark/mobile visual rendering remains unverified. Lighthouse scored accessibility 100 and best practices 96 with no runtime error; its only failing audit was the existing unauthenticated `auth/me` 401 console response.


## Consultation-image follow-up — 10 October 2026

The user supplied a property-document consultation photo and requested a similar generated image beside “Your next move. Our shared focus.” The built-in image tool produced a new photograph-style illustration of an agent/client reviewing documents, with a model house and a softly blurred Kolkata skyline. The local `public/images/pages/services-consultation-v1.webp` is 1448 × 1086 and about 89 KB. It replaces the working tree’s temporary remote stock-photo URL in `ServicesHero.tsx`; its alt text now describes the consultation. The existing rounded responsive image panel, heading and service copy remain. The source photograph was used as a composition reference, not downloaded for reuse. The full prompt/provenance is recorded in `docs/services-consultation-image.md`. Unrelated existing image-host configuration edits are preserved.

Scoped ESLint, TypeScript, formatting, diff whitespace and production webpack build pass for this follow-up. Production SSR retains the exact heading and eager responsive image with the new source/alt; both local and optimized image delivery return HTTP 200. The generated image itself was inspected; live page crop and mobile visual rendering remain unverified under the recorded browser limitation.
