# DreamKey SEO and AI discovery audit

Reviewed 10 October 2026. This separates the observed public deployment from the implementation verified locally. It is not evidence of Google indexing, rankings, business-profile ownership, or ChatGPT recommendations.

## Findings before this change

| Check             | Evidence                                                                                              | Effect                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Production domain | `https://dreamkeykol.com/` redirects to `https://www.dreamkeykol.com/`; final response is 200         | Use the existing `www` origin consistently                                          |
| Crawler files     | Both domains returned 404 for `/robots.txt` and `/sitemap.xml`                                        | No sitemap discovery endpoint; a missing robots file does not itself block crawling |
| Metadata          | Home, Buy, Rent, Services, About, Contact and Login returned no canonical, robots metadata or JSON-LD | Duplicate URL handling and business identity were not explicit                      |
| Social metadata   | Several source pages inherited Home's Open Graph fields                                               | Shared links could describe the wrong page                                          |
| Public content    | Buy has eight illustrative records; Rent has four; Home testimonials are labelled design samples      | These are not verified inventory or customer endorsements                           |
| Internal links    | Landing desktop navigation's Sell destination was `/contact`                                          | Repaired to `/sell`                                                                 |
| Rendering         | Main marketing pages contain server-rendered text; Buy pagination has crawlable links                 | Preserve this architecture                                                          |

The root metadata described inventory as “Verified luxury apartments.” The available code does not substantiate that description; it now describes the consultancy and its local network instead. No inventory, legal, founder or service claims were invented.

## Implemented locally

- `app/sitemap.ts` generates `/sitemap.xml` with ten clean public route URLs. Login, Register, protected areas, APIs, deleted Dashboard and query combinations are excluded. There are no fabricated modification dates; add real content update dates when the backend provides them.
- `app/robots.ts` generates the standard **robots.txt** filename. Public content is allowed; API and protected areas are excluded. `OAI-SearchBot` has an explicit public allowance with the same exclusions. Login/Register remain crawlable so their `noindex` directives can be read. Robots directives are not access control.
- `lib/seo.ts` centralizes the production origin, route titles/descriptions, canonical URLs, Open Graph/Twitter fields and the user-supplied `public/images/OG.webp` share image (1920 × 862, added in the subsequent OG-image follow-up). Careers receives its own metadata through a server layout. Privacy/Terms titles and descriptions remain their original values; their sections, prose, dates and links are unchanged.
- Buy's base page and unfiltered pagination remain indexable with their own canonicals. Page 2 is not canonicalized to page 1. Filter/search/sort variations are `noindex, follow`, with normalized URLs; invalid pagination matches the rendered page. Tracking parameters do not become canonicals.
- Home emits `RealEstateAgent` and `WebSite` JSON-LD with the existing business name, written address, three public phone numbers, email, office photograph, map destination, company social profiles and founder profiles. Services emits four `Service` records sourced directly from visible service copy. JSON-LD is server-rendered and escapes `<` characters.
- No `Review`, `AggregateRating`, listing `Offer`, unconfirmed opening hours, fees or compliance guarantees were added. The preview testimonial region uses `data-nosnippet` to discourage Google from extracting sample quotes; this is not a substitute for replacing the samples before launch. [Google snippet controls](https://developers.google.com/search/docs/appearance/snippet)

Structured data should describe visible, accurate information; it does not guarantee rich results. [Google local-business documentation](https://developers.google.com/search/docs/appearance/structured-data/local-business)

## Mobile performance finding and fix

The first local Lighthouse mobile run after the SEO changes measured performance 52/100, SEO 100/100, LCP about 5.4 seconds and CLS 0.823. Its layout-shift evidence identified the footer moving when streamed page content replaced a loading boundary with no layout footprint. `app/loading.tsx` now wraps the existing fixed loading overlay in a themed placeholder reserving `100svh`; the loaded page design is unchanged.

A repeat run after that change measured performance 77/100, SEO 100/100, **CLS 0**, and LCP about **5.9 seconds**. These are two local simulated mobile measurements, not a controlled field comparison or proof of improved LCP. Image delivery, render-blocking resources and unused JavaScript remain optimization targets. The SEO score checks a limited set of technical basics; it is not a ranking score.

Evidence: `output/seo/home-mobile-before-loading-fix-summary.json`, `output/seo/home-mobile-summary.json` and the corresponding raw Lighthouse JSON reports. Field Core Web Vitals and visual/touch behavior under a deliberately slow connection were not verified in this task.

## Search intent and page ownership

These are proposed topic mappings, not measured keyword volumes or current ranking positions.

| Page            | Primary search intent                                  | Content needed beyond metadata                                |
| --------------- | ------------------------------------------------------ | ------------------------------------------------------------- |
| Home            | Real estate consultants / property services in Kolkata | Clear business identity, actual services and local experience |
| Buy             | Flats, apartments and houses for sale in Kolkata       | Genuine available properties and individual detail pages      |
| Rent            | Rental flats / homes in Kolkata                        | Genuine rentals, terms and current availability               |
| Sell            | Sell property in Kolkata                               | Factual process, required information and enquiry route       |
| Services        | Real estate broker / consultancy services in Kolkata   | Approved service scope, network model and useful answers      |
| About / Contact | DreamKey team / New Town office                        | Real people, consistent contact details and location          |

Keep the approved hero tagline. Do not repeat “property in Kolkata” everywhere or add hidden keyword blocks. Buy/Rent's large intros remain commented out as requested; a compact visible heading could be considered later without restoring those large sections.

## Highest-priority work before expecting rankings

1. **Replace demo content with real, approved content.** Remove or replace preview testimonials before a marketing launch. Have the client approve Careers' existing zero-brokerage, CRM/AI tooling and open-position claims too. Confirm the exact public business spelling and that the retained written address corresponds to the supplied map pin.
2. **Build genuine property detail pages when backend inventory is ready.** Give each property a stable URL, accurate locality, description, price/terms, BHK, area, status, actual photographs and enquiry link. Handle unavailable/deleted records deliberately. Populate the sitemap from published records and actual `updatedAt` values. Do not manufacture property pages from the current samples just for keywords.
3. **Verify and complete the existing Google Business Profile.** Use the real business category, address, phone, office hours, service areas and photographs. Seek genuine customer reviews and respond thoughtfully. Local visibility depends on relevance, distance and prominence; a website cannot control a searcher's distance or buy a better organic local position. [Google local ranking guidance](https://support.google.com/business/answer/7091)
4. **Publish useful locality content after factual review.** Start with areas the team actually serves, such as New Town or Rajarhat if confirmed. Answer practical buyer/tenant questions using first-hand knowledge, dated sources and approved authorship. Link guides to relevant services and real properties. Avoid dozens of near-identical locality pages, invented prices, or unsupported legal/transport claims.
5. **Measure mobile loading and enquiries.** Optimize the initial hero image delivery: the latest local simulated mobile run measured LCP about 5.9 seconds; defer unnecessary third-party work. Preserve image dimensions and avoid layout shifts. Judge progress with field data and actual enquiry quality, not only an automated SEO score.

## GEO / ChatGPT discovery

GEO here means making accurate business information discoverable and understandable by AI search systems. It cannot force ChatGPT to recommend DreamKey.

The explicit `OAI-SearchBot` rule enables OpenAI's search crawler to access public content. Hosting/CDN/firewall rules must also allow its published IP ranges. `GPTBot` has a separate model-training purpose; allowing training is not required to enable the search crawler. `ChatGPT-User` handles user-initiated visits and is not the search-index crawler. No training-policy change was introduced. [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots)

Keep important service explanations in readable HTML, connect related pages with ordinary links, keep public business details consistent, and substantiate claims with real people, photographs and customer experience. These are useful foundations for both ordinary search and AI discovery. Google's AI search guidance retains ordinary SEO requirements and does not require a special AI text file such as `llms.txt`. No such file or unsupported promise of AI ranking was added. [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features), [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

## Deployment and owner/account tasks

The public endpoints were still 404 when checked before implementation. **Deploy these changes before submitting the sitemap.** Then:

1. Verify ownership in Google Search Console and Bing Webmaster Tools using the business's accounts. Submit `https://www.dreamkeykol.com/sitemap.xml`; inspect Home, Buy, Rent, Services and Contact for crawl/indexing problems.
2. Confirm production redirects, canonical URLs, robots content and JSON-LD. Validate structured data with Google's Rich Results Test; valid markup does not guarantee a search feature. Confirm CDN bot access separately.
3. Check search queries and indexed pages in Search Console; use real data to prioritize content. Measure legitimate calls/enquiries with an agreed analytics/privacy setup rather than adding tracking without a decision.

Account access, ownership tokens, actual current ranking positions, keyword volumes, competitors, verified office hours, inventory API publishing dates and field Core Web Vitals were not supplied or established. No Search Console/Business Profile changes, external submissions, deployment, commit or push were performed.

## Verification

Scoped ESLint and TypeScript passed. `npm run build -- --webpack` passed and generated both crawler routes. `output/seo/check-seo.cjs` passed 19 production HTTP route/query cases, including canonical/social/indexing metadata, ten sitemap URLs, both robots groups, parsable business/services JSON-LD, service anchors, images and 404 behavior. Evidence is in `output/seo/verification.json`. Privacy/Terms content was compared against the pre-change revision and remained unchanged. This is local production/SSR verification, not a visual, live-backend, indexing or ranking test.

Technical references: [canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [pagination guidance](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading). The installed Next.js 16.3.8 metadata/robots/sitemap/JSON-LD guides were read; Context7 tools were unavailable in this session.
