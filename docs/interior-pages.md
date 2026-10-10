# Sell, Rent, About, and Contact

Four request-rendered pages continue the landing page’s gold, neutral, editorial visual language. Each page has its own layout, with shared, small components in `components/pages`.

## Page behaviour

- `/sell`: property introduction, selling process, seller enquiry, and native expandable FAQs.
- `/rent`: explicitly illustrative rental collection. Neighbourhood, budget, bedroom and furnishing filters combine; sorting, reset, result count, and empty states work locally. Enquiry links prefill Contact with rental requirements.
- `/about`: consultancy story and existing founder names, roles, and photographs. No new performance statistics or testimonials.
- `/contact`: existing business contact details, enquiry form, directions links, and an interactive map loaded on request.

The forms call the existing `enquiryApi.submitPropertyEnquiry` adapter and existing Zod schema. Indian mobile numbers are normalized to the API’s `+91 1234567890` format. Native and schema validation, pending, success, and error states are included. Success and failure were verified against a temporary local mock endpoint, which was removed before the final build. Live backend enquiry delivery was not tested.

All page files are Server Components and call `connection()` for request rendering. Client boundaries cover navigation, enquiry forms, rental filtering, and the map control. Metadata includes page titles/descriptions and a 3.2 KB favicon derived from the supplied logo; the original favicon remains unchanged for the landing page.

## Theme and scope

Light mode remains active. Page, text, surface, border, focus and button colors use the existing semantic `--home-*` variables. Dark colors were temporarily checked on all four pages, then light mode was restored. Reduced-motion styles disable decorative transitions.

The new header/footer are selected only on these four routes. Other routes retain their previous shell. The landing page, all home components, styles, navigation, mobile menu and footer were checked against 24 baseline hashes and are unchanged. Its existing Sell link remains as it was; the redesigned pages link to the new `/sell` route.

## Verification

- Production build and scoped ESLint checks passed.
- Build output confirms all four routes are rendered on demand (`ƒ`).
- Browser layout checks passed at 320, 390, 768 and 1440 px, with no horizontal overflow.
- Rental combinations, empty results, reset, sort, and Contact prefill were checked in the browser.
- Form validation and mock success/error flows passed. The interactive map control was checked.
- Filter combinations, sorting without mutation, phone normalization and schema validation passed separate assertions.

Final mobile Lighthouse results:

| Route | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Sell | 94 | 100 | 96 | 100 | 3.0 s | 0 |
| Rent | 91 | 100 | 96 | 100 | 3.5 s | 0 |
| About | 94 | 100 | 96 | 100 | 3.0 s | 0 |
| Contact | 93 | 100 | 96 | 100 | 3.2 s | 0 |

The best-practices deduction is the existing anonymous authentication check returning HTTP 401 from `/api-proxy/v1/user/auth/me`. The shared authentication flow was preserved. Lighthouse uses simulated mobile throttling; LCP remains above 2.5 seconds in these runs.

Reports and verification data are in `output/pages`. Generated imagery and exact prompts are recorded in [interior-page-images.md](interior-page-images.md). Rental data is a design placeholder and can be replaced in `components/pages/rental-data.ts`.
