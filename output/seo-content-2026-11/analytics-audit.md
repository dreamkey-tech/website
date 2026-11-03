# Analytics and privacy audit — 3 November 2026

Scope: actual source inspection and fresh runs of existing isolated regression harnesses. No application changes or real Google/CRM requests.

- One root provider and one official Google Analytics component. The installed Google bootstrap is tested under React StrictMode with one configuration/tag source.
- One manual consented initial page view and one per pathname transition; configuration automatic views are suppressed and repeated callbacks/rerenders/query/hash changes are deduplicated. Regranting after withdrawal intentionally starts a fresh current-page view.
- Contact/Sell saved leads fire only after confirmed API success, with pending-submit protection. Failed, invalid, false-success and malformed replies are excluded.
- Telephone, email and WhatsApp clicks use single specific events without their destinations. Search tracks safe structured selections and whether text is present, never raw search text.
- Four default-denied Consent Mode v2 signals; basic tag loading after permission, 180-day versioned preferences, separate advertising category, GPC/DNT override, withdrawal/cookie clearing, no replay of denied interactions. Existing Vercel Analytics is gated and URL-sanitized.
- Runtime allowlists strip customer fields and arbitrary parameters. Page URLs omit query/hash, unknown paths are generic, referrers/titles are sanitized. Auth secrets and protected owner/CRM data are not analytics payload fields.
- Authenticated detail routes remain gated/noindex and omitted from the sitemap. Public DTOs whitelist card fields; private detail requests use no-store and explicit cookie forwarding.

## Fresh verification

17 core checks + 9 provider lifecycle checks + 9 consent UI checks + 6 search/filter checks passed (41 analytics checks), plus 12 enquiry regression groups. Complete logs and results are beside this file:

| Existing harness | Evidence | Result |
| --- | --- | --- |
| `node output/analytics/check-analytics.cjs` | `analytics-core-verification.json` | 17 checks passed |
| `node output/analytics/check-provider.cjs` | `analytics-provider-provider-verification.json` | 9 checks passed |
| `node output/analytics/check-consent-ui.cjs` | `analytics-consent-ui.log` | 9 checks passed |
| `node output/analytics/check-search.cjs` | `analytics-search-search-verification.json` | 6 checks passed |
| `node output/enquiry/check-enquiry.cjs` | `analytics-enquiry-verification.json` | 12 regression groups passed |

The original harnesses were executed without assertion/source edits. An output-only Node `fs.writeFileSync` redirection saved results into this folder and preserved historical evidence. Transport, visibility and Next Script cache are isolated as each harness describes. These are actual-source regressions, not real Google network receipt or account inspection.

## Owner confirmations and remaining checks

The user previously confirmed that overlapping automatic history pageviews, form interactions, site search, outbound clicks and file downloads are off, and Vercel measurement/debug settings are saved. The configured public measurement ID is `G-2VBCFFSS0E`. No GA administrator account was inspected.

GA Realtime/DebugView/Tag Assistant receipt, real CRM-and-GA success together, production tag delivery, GSC/GBP account state and deployed settings remain unverified. Local mocks establish none of those. No production frontend or mutation was performed.

The initial source audit found Buy search metadata using a canonical built from normalized filter values, including arbitrary `q`. Root removed filter/search text from canonical and social/schema page URLs while preserving search functionality. The fresh localhost production HTTP/SSR verifier passes synthetic query canary checks: filtered routes canonicalize to `/buy`, remain `noindex, follow`, and do not repeat arbitrary search text in metadata/JSON-LD. Search URLs themselves continue supporting user-entered search text; no assertion is made that visitor-entered data can never appear in a URL.

## Final local SEO checks

`node output/seo-content-2026-11/check-seo.cjs http://127.0.0.1:3063` passed 24 public/auth/query/private/404 route checks against the final local production preview. Ten canonical indexable sitemap URLs, both crawler groups, unique metadata, H1/heading hierarchy, social links, page/breadcrumb/business/service schema, approved OG assets, dynamically normalized Buy pagination and bounded existing navigation passed. No heading or unverified navigation warnings remained. The parser executes no scripts or external resources. Evidence: `seo-verification.json`, `seo-check.log`.

The first fetch was denied by the sandbox; the exact read-only local verifier was then approved with escalation. An initial root canonical comparison treated equivalent origin URLs with/without trailing `/` differently; URL normalization corrected the verifier, without changing application source. No production or backend mutations were performed.
