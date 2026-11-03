# DreamkeyKol Reality LLP — content and SEO implementation report

3 November 2026. Baseline: clean `main` at `9c6bedc` (includes the real testimonials and API-backed Best properties). This report describes the new working-tree changes, not a deployment or ranking result.

## Evidence and scope

Business positioning and official company/social names come from the user’s master implementation brief. Existing phone, email, written address, office map, founder identities and portraits are retained from the approved repository. Public routes and behavior were inspected in source and a local production build. Search Console/Google Business Profile/GA account statements are owner-supplied, not independently inspected here. This task did not commit, push or deploy.

App Router Next.js 16.3.8, React 19, strict TypeScript, native Metadata API and existing CSS modules remain. No new package, route, section, visual wrapper, stylesheet, image or font was added. Installed Next metadata/JSON-LD/crawler guides and current Context7 documentation were read before implementation.

## A. Page SEO report

The following titles, descriptions, directives and canonical URLs were read from the final local production HTML. Standard Open Graph and Twitter cards use the same page-specific title/description, the preferred www origin, `en_IN` locale and the existing approved `/images/OG.webp` (1920 × 862). No speculative `instagram:*` metadata was added; the official Instagram profile participates in the sameAs graph and existing footer links.

| Page URL | Title | Meta description | Primary intent / keyword | Canonical |
| --- | --- | --- | --- | --- |
| https://www.dreamkeykol.com/ | Real Estate Consultancy in Kolkata \| DreamkeyKol Reality | Buy, rent or sell property in Kolkata with DreamkeyKol Reality. Explore suitable options, local broker connections and property documentation assistance. | Real estate consultancy in Kolkata | https://www.dreamkeykol.com |
| https://www.dreamkeykol.com/buy | Buy Flats in Kolkata \| DreamkeyKol Reality | Explore flats and properties for sale in Kolkata with DreamkeyKol Reality. Share your location, budget and priorities for buying assistance through our local network. | Buy flats in Kolkata | https://www.dreamkeykol.com/buy |
| https://www.dreamkeykol.com/rent | Flats for Rent in Kolkata \| DreamkeyKol Reality | Explore sample rental homes in Kolkata, then share your preferred area, budget and requirements with DreamkeyKol Reality to discuss current rental options. | Flats for rent in Kolkata / rental assistance | https://www.dreamkeykol.com/rent |
| https://www.dreamkeykol.com/sell | Sell Property in Kolkata \| DreamkeyKol Reality | Planning to sell property in Kolkata? DreamkeyKol Reality connects your property information with potential buyers, local brokers and property consultants. | Sell property in Kolkata | https://www.dreamkeykol.com/sell |
| https://www.dreamkeykol.com/services | Real Estate Services in Kolkata \| DreamkeyKol Reality | Discover property buying, rental and selling assistance, real estate investment consulting and documentation support in Kolkata with DreamkeyKol Reality. | Real estate services in Kolkata | https://www.dreamkeykol.com/services |
| https://www.dreamkeykol.com/about | About DreamkeyKol Reality \| Kolkata Property Consultants | Meet DreamkeyKol Reality LLP, a Kolkata real estate consultancy connecting buyers, tenants, owners and investors with local brokers and property consultants. | DreamkeyKol Reality / company identity | https://www.dreamkeykol.com/about |
| https://www.dreamkeykol.com/contact | Contact DreamkeyKol Reality \| Property Consultant Kolkata | Contact DreamkeyKol Reality in New Town, Kolkata for buying, renting, selling or property consulting. Call +91 79801 33881 or share your requirements online. | Contact property consultant in Kolkata | https://www.dreamkeykol.com/contact |
| https://www.dreamkeykol.com/careers | Real Estate Careers Enquiries \| DreamkeyKol Reality | Interested in real estate work in Kolkata? Contact DreamkeyKol Reality to discuss property consulting, sales or marketing roles and confirm current openings. | Dreamkey real estate careers enquiries | https://www.dreamkeykol.com/careers |
| https://www.dreamkeykol.com/privacy | Privacy Policy \| DreamkeyKol Reality LLP | Read how the Dreamkey website handles personal information, enquiries, cookies and optional analytics, and how to manage your privacy preferences. | Privacy policy (noncommercial) | https://www.dreamkeykol.com/privacy |
| https://www.dreamkeykol.com/terms-and-conditions | Terms & Conditions \| DreamkeyKol Reality LLP | Read the terms for using the Dreamkey website, including property information, enquiries, third-party services and responsibilities when exploring a transaction. | Website terms (noncommercial) | https://www.dreamkeykol.com/terms-and-conditions |
| https://www.dreamkeykol.com/login | Log In \| DreamkeyKol Reality | Log in to your Dream Key account and continue your property search in Kolkata. | Account sign-in (noindex) | https://www.dreamkeykol.com/login |
| https://www.dreamkeykol.com/register | Create Account \| DreamkeyKol Reality | Create your Dream Key account to begin your property search in Kolkata. | Account registration (noindex) | https://www.dreamkeykol.com/register |
| https://www.dreamkeykol.com/forgot-password | Reset Password \| DreamkeyKol Reality | Reset your Dream Key account password with an email verification code. | Account recovery (noindex) | https://www.dreamkeykol.com/forgot-password |

The 10 marketing/legal pages are `index, follow`. Login, Register and Forgot password are crawlable `noindex, follow` and are excluded from the sitemap. The trailing slash on the Home root is URL-equivalent in Next’s rendered metadata.

| Additional route/state | Metadata and indexing treatment |
| --- | --- |
| `/buy?page=N` | Available unfiltered pages have normalized self-canonicals, a page-number title and distinct page-number description. Out-of-range values normalize to the page actually rendered; tracking parameters are excluded. |
| Buy filters/search/sort | `noindex, follow`, canonical and og:url use `/buy`. Arbitrary visitor text is never copied into SEO URLs or JSON-LD. Search behavior and the visitor’s existing GET search URL remain. |
| `/buy/[UUID]` | Generic “Property Details \| DreamkeyKol Reality” title and login/specification description, lowercase UUID canonical, `noindex, follow`, outside sitemap. No gated facts or owner/customer data in public metadata/schema. |
| Retired sample detail slugs | Existing redirects to `/buy` retained. Invalid IDs/unknown routes return the existing 404/noindex behavior; invalid path text is not repeated in detail canonicals. |
| Embedded FAQs | Existing Sell and Services questions are optimized in place. There is no separate FAQ route. No FAQ rich-result markup was added. |
| Blog | No blog exists in the route tree. No blog UI or speculative article route was created. |

## B. Technical SEO report

| Area | Final implementation / evidence |
| --- | --- |
| Metadata | `lib/seo.ts` centralizes unique per-route copy and official company identity. All 13 static public/account routes verified; no meta-keyword lists. |
| Canonical origin | `https://www.dreamkeykol.com`; sitemap, OG, JSON-LD and canonical metadata agree. Filter-query privacy is improved without changing form/search/API behavior. |
| Sitemap | Existing `app/sitemap.ts` returns exactly 10 canonical public URLs. No auth, API, protected detail, deleted Dashboard, filter variant or fabricated lastmod is added. |
| Robots | Existing `app/robots.ts` allows public crawling for `*` and `OAI-SearchBot`, repeats protected/API restrictions in both groups, and points to the www sitemap. Account/detail noindex directives remain crawlable. Robots is not authentication. |
| Business identity | Existing single `RealEstateAgent` entity now has official name/legalName `DreamkeyKol Reality LLP`, established public business contacts, four exact official sameAs links and preserved founder references. RealEstateAgent is an Organization/LocalBusiness subtype; no duplicate entity was invented. |
| Page and navigation schema | `lib/page-schema.ts` adds server JSON-LD page identity and two-level Home → current page breadcrumbs for existing public routes. Home retains WebSite/agent identity; Services retains four Service records sourced from visible copy. No visual breadcrumbs were added. |
| Safe markup | Existing JSON-LD serializer escapes `<`. No fake review, aggregate rating, invented prices/Offers, dates, office hours, fees or compliance guarantees. Protected detail data is excluded. |
| Sharing/socials | `lib/social-profiles.ts` is the shared exact-profile source for schema/footer links. Instagram, YouTube, company Facebook and LinkedIn match the supplied URLs; no icon/design changes. Existing accessible new-tab labels and noopener/noreferrer remain. |
| Images | Approved files, dimensions, crop and loading behavior unchanged. Corrected inaccurate About, Contact and Services alt descriptions to describe the actual retained images; illustrative assets remain labelled illustrative. |
| Internal discovery | Existing Home → Buy/Rent/Sell/Services and service-card → relevant route links retained. Buy/Rent CTA → Contact, Sell → About, and shared navigation/footer remain. Bounded local route/anchor checks pass. No gratuitous inline link or new section was inserted. |
| Hosting redirects | Existing auth/sample route redirects preserved. Historical Oct10 notes observed apex → www at hosting; this task did not re-test production redirects or modify Vercel domain settings. Owner should confirm HTTPS/apex redirects after release. |
| Performance | Existing local variable fonts/swap, responsive reserved next/image panels, initial hero priority, deferred extra slides, section-local featured Suspense and consent-gated scripts retained. No client feature/dependency added. See the source-backed performance audit and remaining issues below; no new field-CWV improvement is claimed. |

### Structured data validation

Home’s actual public JSON-LD passed Schema.org Validator with 0 errors / 0 warnings. Services’ actual JSON-LD passed with 0 errors / 0 warnings, including its four Service records. Google Rich Results Test code mode detected three valid items (Breadcrumb, Local business and Organization) for the final Services snippet. Reusing the known business telephone/address/image cleared three initial optional recommendations; the only remaining recommendation is optional `priceRange`, which is deliberately omitted because no verified fee/range was supplied. These are snippet validations, not a production URL crawl or a rich-result guarantee.

Evidence: `output/seo-content-2026-11/schema-*-validator.txt`, `google-rich-results*.txt` and the exact public `*-schema-snippet.html` inputs. External validators received only the public structured-data snippets, never customer/account data or private listing payloads.

## C. Keyword mapping and priorities

These are intent-led editorial targets from the business brief, not measured volumes, difficulty scores or promised positions. The pages retain distinct purposes.

| Cluster | Preferred page | Supporting themes / content job |
| --- | --- | --- |
| General consultancy | Home `/` | Real estate consultancy Kolkata, property consultants Kolkata, local network, buying/renting/selling assistance. |
| Buying | `/buy` | Buy flats, flats/houses for sale, residential property, budget/locality requirements and local buying assistance. Live public API cards retained. |
| Rental | `/rent` | Flats/houses for rent, rental assistance, locality/budget/bedrooms. Sample inventory disclosure retained; do not promote these examples as available stock. |
| Selling | `/sell` | Sell property/flat in Kolkata, owner assistance, information sharing, enquiries, viewings and documentation. No guaranteed sale. |
| Service scope | `/services` | Real estate services, investment consulting, property documentation assistance, buying/rental/selling support and consultant collaboration. Six services explained within the existing four cards/FAQ. |
| Brand | `/about` | DreamkeyKol Reality, Dreamkey Kolkata, company founders and customer-focused approach. |
| Contact/conversion | `/contact` | Contact property consultant Kolkata, New Town office, discuss location/budget/requirements. Existing real enquiry API retained. |
| Careers | `/careers` | Branded careers enquiries; role profiles are not asserted vacancies or contractual employment promises. |
| Legal/accounts | Legal and account routes | Purpose-specific information, no commercial keyword targeting. Accounts stay noindex. |

Use Search Console’s real queries by page, device and country to refine these targets. Start with nonbrand high-intent enquiries and useful local content, not repeating the same phrase on every heading. Compare clicks, impressions, CTR and position over meaningful periods; use GA’s confirmed saved leads to assess enquiry quality. No search volume, current rank or conversion uplift was invented.

## D. Content improvement report

| Existing area | Changes made |
| --- | --- |
| Home | Preserved the exact hero tagline; existing paragraph now identifies Kolkata real estate consultancy. Existing management/featured/final CTA copy clarifies local connections, owner enquiries and documentation assistance. Category gallery’s existing accessible H2 describes its subject. Real testimonials stay untouched. |
| Buy | Existing accessible H1 and results heading identify flats/properties for sale. Existing catalogue note and CTA explain availability/price confirmation and sharing location/budget/priorities through the local consultant network. Hidden large intro stays commented. |
| Rent | Existing accessible H1/CTA clarify rental assistance. Existing note keeps explicit illustrative rents/homes and unverified photo-association disclosure. Hidden large intro stays commented. |
| Sell | Existing eyebrow, introduction/process and remote-owner FAQ explain property details, local broker network, viewings and documentation; realistic buyer/sale expectations replace implied guarantees. |
| Services | Existing paragraphs, fourth card and FAQ explicitly cover buying, renting, selling, real estate consulting, investment consulting and documentation support. Selected Kolkata coverage and collaboration remain grounded in the supplied brief. |
| About | Official LLP identity, local broker/consultant model, customer priorities and selected East/South/North Kolkata coverage clarified. Founder identities/bios/links/photos stay intact. |
| Contact | Existing introduction explains phone/email/form enquiries and the useful requirements to share. Written address, map pin, business phone/email and form/API payloads remain. |
| Careers / legacy footer | Removed unverified claims about proprietary/AI tools, lead quality, training, zero brokerage, a 2012 founding date and universal verified stock. Existing role cards now ask visitors to confirm current openings, requirements and terms. No JobPosting schema or vacancy claim added. |
| Privacy / Terms | Only metadata and invisible page/breadcrumb JSON-LD changed; legal prose, dates and contact links are preserved. |

## E. Analytics verification report

Existing `G-2VBCFFSS0E` integration is preserved. One root provider / one official Google tag, manual consented initial and Next pathname views, query/hash removal, rerender/StrictMode deduplication, safe property/search/contact events and successful-save-only leads were inspected and freshly tested. Four default-denied Consent Mode v2 signals, stored preferences, withdrawal, GPC/DNT and later preference changes remain. No raw enquiry values, search terms, email/phone/WhatsApp destinations, auth secrets or private owner information are GA payload fields.

41 existing analytics checks and 12 enquiry regression groups pass with isolated transports. They do not establish actual Google receipt, email delivery, live account behavior or real CRM conversion receipt. The owner previously confirmed overlapping automatic history pageviews, form interactions, search, outbound clicks and file downloads were disabled and Vercel ID/debug settings saved; no admin setting was independently inspected here. Detailed source/command/evidence report: `output/seo-content-2026-11/analytics-audit.md`.

## F. UI preservation and QA

Design, layout, existing visual components, styling, spacing, images, fonts, icons, animations and functional flows are preserved. Only authorized copy, metadata, link destinations for supplied social profiles, and invisible JSON-LD changed. Text edits may naturally wrap differently; pixel-identical text is not claimed. No new visible breadcrumbs/sections, blog, keyword block or redesign was introduced.

Source AST comparisons against `9c6bedc` verify unchanged visual JSX/tag order, styling, image/action props, exact Home tagline, legal prose and dates. No style/font/image asset, form/auth/API adapter, consent or animation implementation changed. Evidence: `ui-preservation.json` and before/after Services screenshots. Twelve local browser geometry checks cover Services at desktop, all eight main marketing pages at 390px, and Buy/Contact/Services at 320px; none has horizontal overflow. The updated Services FAQ opens with keyboard activation. Evidence is in `browser-verification.json`; physical-device touch and field performance are not inferred from viewport emulation.

Production webpack build, strict TypeScript, scoped ESLint and whitespace checks pass. Local production HTTP/SSR verifier passes 24 route/query cases, exactly 10 sitemap URLs, canonical/social/indexing rules, a single H1 with no hierarchy warnings, structured data, all four official socials, query privacy, anonymous detail gate, deleted Dashboard and bounded internal links. The existing enquiry tests verify forms without submitting real leads. Evidence and reproducible checks: `output/seo-content-2026-11/`.

## G. Remaining issues and owner follow-ups

1. **Production/account verification:** After authorized release, owner confirms HTTPS/apex → www redirects, deployed sitemap/robots/canonicals/JSON-LD, GA Tag Assistant/DebugView/Realtime initial and SPA events under accepted/rejected choices, and a controlled saved-enquiry conversion. No production frontend or account session was tested here, following the user’s earlier instruction.
2. **Search Console:** The user reports the domain property is connected, sitemap processed with 10 discovered pages, and Home indexed. This implementation preserves those 10 canonical routes. Account access/reports are unverified. Monitor Page indexing/exclusions, queries/CTR, clicks/impressions and mobile/desktop Core Web Vitals; inspect changed representative URLs after deployment without repeatedly requesting indexing.
3. **Google Business Profile/social consistency:** Owner must compare the exact LLP name, `https://www.dreamkeykol.com/`, `+91 79801 33881`, retained written address/map and service categories to the actual profile. Add the four supplied socials in the account where supported; no GBP account was connected or modified. Office hours and the written-address/pin match are not newly verified.
4. **Rental inventory:** Rent still contains explicitly labelled sample homes/rents and reference photos. Real backend-approved availability, terms and property associations are required before treating it as a live rental catalogue.
5. **Property SEO versus access gating:** Listing detail pages intentionally require verified login, remain noindex and are omitted from sitemap. They cannot presently serve as organic public property landing pages. A future approved public-preview policy/API would be needed; no gate was weakened for SEO.
6. **Field performance:** No current field LCP/INP/CLS or controlled Lighthouse gain is established. Current good thresholds at the 75th percentile are LCP ≤2.5s, INP ≤200ms, CLS ≤0.1. Source audit flags mobile hero cover sizing, upstream 15s no-store request latency, featured fallback geometry, animation tracing, two Contact map surfaces and legacy Careers remote background for measured follow-up. Existing sizes/timing/loading behavior stay unchanged because this brief forbids UX changes. See `performance-audit.md`; old October metrics are historical.
7. **Content/locality proof:** Confirm current coverage and availability for locality-specific enquiries. Expand only with original team-reviewed local information. No invented stock counts, return promises, customer totals or local offices were added.
8. **Rankings and AI visibility:** Crawlability, useful visible content and accurate identity are foundations, not guaranteed Google positions or AI recommendations. No special AI ranking promise, thin locality pages or fake reviews were added.

## Future editorial and social content plan (no UI added)

No blog exists, so these are proposed briefs for later business approval, not published articles. Use first-hand team knowledge; verify current legal/financial/transport details with primary sources and a qualified reviewer when needed. Every future approved article needs unique metadata/canonical, clear headings, dated updates and contextual service links.

| Topic / customer question | Useful original contribution | Link destination |
| --- | --- | --- |
| Best areas to consider when buying a flat in Kolkata | Team-reviewed criteria for commute, budget, household needs and confirmed operating areas; no universal “best” claim. | Buy + Contact |
| What to check before buying in New Town | Visit checklist, questions to ask and documentation scope, reviewed locally. | Buy + Services |
| Renting a flat in Rajarhat | Requirements/visit/check-in checklist; use real current availability and terms if confirmed. | Rent + Contact |
| Property documents buyers should ask about | Explain the assistance process and when an independent legal professional is needed; verify current West Bengal sources. | Services + Buy |
| Buying versus renting in Kolkata | Transparent example assumptions and personal priorities; avoid guaranteed returns or financial advice. | Buy + Rent |
| Understanding the property selling process | Owner information checklist, broker coordination and realistic next steps. | Sell + Contact |
| Choosing a property consultant | Questions about scope, communication, fees and documentation assistance. | About + Services |
| What documentation assistance covers | Team-confirmed scope, responsibilities and professional review boundaries. | Services + Contact |
| Factors when considering residential investment | Objective/budget/location questions, risks and costs; no appreciation promises. | Services + Contact |
| Exploring Salt Lake property options | Original, current local insight only after coverage and information are confirmed. | Buy + Contact |

Repurpose approved practical advice for YouTube, Instagram/Facebook and LinkedIn using natural Kolkata/locality context and descriptive captions/titles. Link to the relevant existing route, maintain exact company identity/profile URLs, and obtain approval for real client stories/photos. No social account, username or Google Business Profile was changed by this implementation.

## Current primary guidance consulted

- [Next Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), installed 16.3.8 guides and Context7 `/vercel/next.js`.
- [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) and [pagination](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading).
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) and [breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).
- [Schema.org RealEstateAgent inheritance](https://schema.org/RealEstateAgent), [Schema.org Validator](https://validator.schema.org/) and [Google Rich Results Test](https://search.google.com/test/rich-results).
- [Google AI-search guidance](https://developers.google.com/search/docs/appearance/ai-features) and [Web Vitals thresholds](https://web.dev/articles/vitals).
