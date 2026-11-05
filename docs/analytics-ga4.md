# DreamKey GA4 implementation

Implementation record: 3 November 2026. This document describes inspected frontend source and the remaining release/account checks. It is not evidence of deployment, Google Analytics receipt or live CRM enquiry delivery.

## Configuration and ownership

The existing Google Analytics property supplied by the user is identified by measurement ID `G-2VBCFFSS0E`. Configure the public build-time environment variable:

```dotenv
NEXT_PUBLIC_GA_ID=G-2VBCFFSS0E
```

`NEXT_PUBLIC_ANALYTICS_DEBUG=true` explicitly enables analytics and DebugView marking during a local test. Leave it absent or false in production. Without a valid measurement ID, or in development without the debug flag, GA collection stays disabled. These are public configuration values, not credentials. Do not place Google account credentials or service-account secrets in frontend variables.

`@next/third-parties/google` supplies the official `GoogleAnalytics` component, mounted once through `components/analytics/AnalyticsProvider.tsx` in the root layout. No second GTM container or hard-coded Google tag is added. The existing Vercel Analytics component is routed through the same analytics permission and its URL is sanitized before sending.

Changing `NEXT_PUBLIC_*` variables requires a new frontend build/deployment. A source change or local test does not alter the live GA4 property's stream settings.

## Consent and privacy behavior

The user approved a small matching consent banner and preferences panel as the UI addition for this task. The existing pages, property presentation, enquiry payloads, sign-in and contact destinations retain their behavior.

- The initial Google Consent Mode v2 command denies `analytics_storage`, `ad_storage`, `ad_user_data` and `ad_personalization` before configuration/events.
- Basic-mode loading: the external Google tag is not mounted until analytics permission is granted. Pre-consent business events are discarded; they are not replayed after acceptance. The initial denied consent commands are local queue entries, not permission to transmit pre-consent events.
- Accept all, Reject optional and Cookie preferences are available from the banner. The native preferences dialog offers essential, analytics and advertising categories; optional categories start off. Essential functionality remains available. Closing the panel without saving does not grant permission.
- The first-party preference record is versioned under `dreamkey:consent:v1` in local storage and expires after 180 days. A storage-denied browser uses an in-memory choice for the session. The stored record contains booleans, version and time, without customer identity.
- Global Privacy Control or Do Not Track forces optional permission off. This is an explicit application safeguard, not a claim that GA automatically honors either browser signal. The panel explains the override and disables optional toggles while it applies.
- Permission can be changed later using Cookie preferences in the Home, interior, legacy or account footer, or in Privacy section 4. Changes update Google consent, suppress collection and clear optional Google cookies when permission is withdrawn. Authentication cookies are untouched.
- Google Analytics cookies are configured for up to 180 days without refreshing their expiry on each page load. Advertising permission is separate; no separate advertising tag is installed. Google signals remain disabled. Ad-personalization permission is only effective when analytics collection is also allowed.

The banner measures its height to reserve document space. While present, consent-scoped CSS raises the existing fixed enquiry link and legacy mobile navigation above it. The native dialog supports close, Escape, backdrop dismissal and returning focus to its opener. Actual viewport and keyboard checks must be recorded separately from source/unit checks.

`app/privacy/page.tsx` section 4 describes the implemented categories, optional Google Analytics, excluded personal fields, browser privacy controls, retention and the preferences action. Other legal prose, the existing date and contact information were preserved.

## Central collection and safe context

`lib/analytics.ts` owns the measurement ID, collection gate, allowed event names, parameter allowlists, safe route/URL helpers, pageview deduplication and Google consent configuration. Tracking returns without blocking the visitor when analytics is disabled or unavailable; handlers do not prevent navigation or await a Google request.

Known public route paths and real property UUID paths are retained. Query strings and fragments are excluded from page URLs. Unknown routes use a generic not-found path, and generic titles prevent arbitrary document content becoming analytics metadata. The first external referrer retains its origin; later virtual pageviews use the previous sanitized route. No global `ignore_referrer` override is applied.

Do not pass arbitrary data into `trackEvent`. Its runtime allowlists deliberately reject unknown keys and unapproved values. Never send names, email, telephone destinations, WhatsApp messages, passwords, OTPs, enquiry contents, free-text searches, property owner details or raw URLs. Search records only whether text was supplied, plus bounded structured selections where supported. No customer User-ID or lead value is fabricated. Retained illustrative records carry `inventory_source=sample`; active CRM Buy/Rent catalogue and Home featured records carry `inventory_source=live`. Rent uses its own `rent_catalogue` context with the shared UUID card/access flow.

## Event mapping

| Event                    | Current source/trigger                                                                        | Safe context                                                                                                     |
| ------------------------ | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `page_view`              | Initial consented page and App Router pathname transitions                                    | Sanitized absolute URL, generic title, sanitized previous referrer; query/hash-only changes do not add pageviews |
| `cta_click`              | Delegated navigation/outbound links, named content CTAs and Home category links                                  | Header/footer/component, bounded CTA name, approved local path or coarse external domain category                          |
| `whatsapp_click`         | All rendered `wa.me`, `api.whatsapp.com` or `web.whatsapp.com` links                          | Component only; destination phone/text excluded                                                                  |
| `phone_click`            | Rendered `tel:` links                                                                         | Component only; number excluded                                                                                  |
| `email_click`            | Rendered `mailto:` links                                                                      | Component only; address excluded                                                                                 |
| `property_search`        | Hero/Buy search submission, Buy/Rent filter/reset/sort actions                                | Buy/rent transaction, interaction type, approved filter/value; no raw search term                                |
| `view_item_list`         | A marked Home/Buy/Rent property card enters the observer viewport                             | One-item `items` array, public/sample ID, category, list and inventory source                                    |
| `select_item`            | Live Buy image/title detail link clicked, including intent before an anonymous login gate     | Matching public property ID/category/list; no protected details                                                  |
| `view_item`              | Authenticated property detail impression when the detail marker is active                     | Public property ID/category, transaction and inventory source                                                    |
| `property_enquiry_click` | Marked listing/detail enquiry links; Home/Rent cards lead to the existing enquiry destination | Public/sample property ID/category/list where available                                                          |
| `service_interest`       | Existing Services card consultation links                                                     | `buying`, `renting`, `selling` or `investment_and_real_estate_consulting`                                        |
| `form_start`             | First consented focus/input on a Contact or Sell form control                                 | `contact_enquiry` or `sell_enquiry`, approved enquiry purpose; once per form attempt                             |
| `generate_lead`          | Validated Contact/Sell form receives the existing adapter's confirmed successful response     | Form and enquiry purpose; most recent service interaction in the current page session where available            |

The later, consistent recommended event names take precedence over the brief's earlier alternative `select_property`/`view_property` names. One contact click produces its contact event, rather than an additional generic CTA event. One marked property/service action similarly uses its specific event instead of an extra generic CTA. Authentication, newsletter placeholders and retained inactive forms are not counted as successful customer enquiries.

`generate_lead` is absent on validation errors, API errors, unsuccessful/malformed responses and duplicate pending submissions. Starting another enquiry resets the form-start guard. A current-page service association is explanatory navigation context, not verified advertising attribution or evidence of a closed sale.

## Relevant files

- `app/layout.tsx`: global provider, replacing the unconditional Vercel Analytics mount.
- `lib/analytics.ts`, `lib/consent.ts`: safe collection and permission store.
- `components/analytics/AnalyticsProvider.tsx`, `InteractionTracking.tsx`: consented tag mount, pathname watching, delegated interactions and visible property impressions.
- `components/analytics/CookieConsent.tsx`, `CookieConsent.module.css`, `CookiePreferencesButton.tsx`: permission UI, fixed-element offsets and reusable preferences entry point.
- `components/pages/PropertyEnquiryForm.tsx`: explicit first interaction and confirmed-success lead tracking.
- `components/buy/BuySearch.tsx`, `BuyFilters.tsx`, `BuyBudget.tsx`, `BuyResults.tsx`; `components/ui/Select.tsx`: structured Buy searches and selections.
- `components/pages/RentalBrowser.tsx`, `RentalCard.tsx`: existing rental searches and sample cards.
- `components/buy/BuyCard.tsx`, `components/home/HomePropertyCard.tsx`, `DesignGalleryCard.tsx`, `HeroPropertySearch.tsx`, `HeroSearchField.tsx`: listing/category/search markers.
- `components/property/PropertySession.tsx`, `LivePropertyDetails.tsx`, `PropertyEnquiryPanel.tsx`, `app/buy/[slug]/page.tsx`: authenticated detail context and enquiry links.
- `components/services/ServiceCard.tsx`: actual service-link labels.
- `components/layout/FloatingEnquiry.tsx` and footer components: contact component context and preferences entry points.
- `app/privacy/page.tsx`: only the approved Cookies and Analytics section updated.

Inspect the final Git diff for the exact release file list; this list explains responsibility rather than claiming every retained component changed in this task.

## Required GA4 owner setup

An Editor or administrator of the existing property must complete these steps. They cannot be confirmed from local code or the public measurement ID.

1. Confirm that `G-2VBCFFSS0E` is the intended existing DreamKey web data stream and that its website URL matches the production domain. Reuse that stream; do not create another tag/property for these changes.
2. In **Admin → Data streams → Web stream → Enhanced measurement**, review each option individually. Keep manual pageviews as the sole route-view source: disable **Page views → Show advanced settings → Page changes based on browser history events**. `send_page_view:false` suppresses the config pageview but does not disable those automatic history pageviews. Disable any additional GTM/browser-history pageview tags too. [Google pageview guidance](https://developers.google.com/analytics/devguides/collection/ga4/views)
3. Disable automatic **Form interactions** because Contact/Sell explicitly send `form_start`; automatic `form_submit` cannot confirm successful CRM storage. Disable automatic **Site search** because free-text `q`/search inputs can contain personal information. Disable automatic **Outbound clicks** because `link_url` could include WhatsApp phone/text parameters. Keep automatic **File downloads** off until its destination URLs are reviewed. Review scroll and video measurement separately for the actual site; do not enable unreviewed URL-collecting features merely to satisfy a blanket enhanced-measurement checkbox. [Enhanced measurement fields](https://support.google.com/analytics/answer/9216061?hl=en)
4. Enable web-stream **Data redaction** for email addresses and sensitive query keys such as `q`, `search`, `query`, `email`, `phone`, `mobileNo`, `fullName`, `text`, `property`, `message`, `token`, `otp` and `returnTo`, as applicable. This is defense in depth; it does not replace frontend allowlists or guarantee all PII is removed. [Data redaction](https://support.google.com/analytics/answer/13544947?hl=en)
5. Mark **`generate_lead`** as the primary key event. WhatsApp/phone/email clicks can be secondary interest measures, but are not successful saved enquiries. Do not create GA-generated duplicate `generate_lead` events from generic form submission or contact-page views.
6. Add useful **event-scoped custom dimensions** for `component_name`, `cta_name`, `form_name`, `enquiry_type`, `service_name`, `transaction_type`, `inventory_source`, `interaction_type` and `filter_name` if they are needed in standard reports. Use standard item dimensions for item/list/category reporting. Avoid registering every property UUID as a custom dimension, which creates high cardinality. Do not enable user-provided data or enhanced conversions that collect contact fields as part of this integration.
7. Review unwanted referrals/OAuth domain behavior and advertising product links in the actual property. Keep audience/personalization settings consistent with the recorded choices; no account-side ad integration was configured by this source change. [Privacy controls](https://developers.google.com/tag-platform/security/guides/privacy)
8. Set the public production environment variable, keep the local debug flag off, build and deploy through the existing release process. Then perform the live verification below. Preserve a record of the deployment and GA settings so a future developer does not re-enable automatic duplicates.

Google documents that advanced denied-storage mode can send cookieless pings; the initial-loading gate here instead implements basic mode. [Consent mode overview](https://developers.google.com/tag-platform/security/concepts/consent-mode), [Consent command order and persistence](https://developers.google.com/tag-platform/security/guides/consent). URL/referrer overrides follow the [configuration reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/config); items follow [recommended event parameters](https://developers.google.com/analytics/devguides/collection/ga4/reference/events).

## Verification record and release checklist

Local checks pass: 17 actual-source consent/store/payload/delegation checks, nine consent UI checks, nine provider/official-bootstrap lifecycle checks in React StrictMode, six search/filter component checks, and extended enquiry success/failure regressions. Tests isolate Google/CRM transport; no live customer enquiries or GA events were created. TypeScript, scoped ESLint and whitespace checks pass. Production webpack build passed; the final build log is retained in `output/analytics/build.log`.

Browser review on the local production preview covers the banner/preferences at desktop and 390 × 844 mobile sizing, essential locked and optional-off defaults, Escape dismissal/focus return, rejection persistence after reload, footer reopen and zero Google-tag script elements after rejection. Mobile DOM geometry shows no horizontal overflow; the floating enquiry control is 16px above the banner. Screenshots are under `output/analytics/`. Accepted-consent/event flows were tested with an isolated official Google bootstrap, not the real collector. A fresh grant after withdrawal starts one new current-page view/impression because the previous analytics cookies were cleared; ordinary rerenders and repeated callbacks do not repeat them.

The user confirmed that production deploys automatically from GitHub. The user subsequently confirmed that the overlapping automatic measurements (including File downloads) are off and the Vercel Production public measurement ID/debug settings are saved. This is owner confirmation, not independent GA console inspection. The local `.env.local` has only the two public analytics settings added/updated; other private values were preserved and remain ignored. `.env.example` documents the public variables.

Still unverified at this checkpoint:

- Production deployment and production environment values.
- Independent inspection of the owner-confirmed automatic measurement settings; redaction/key-event/custom-dimension configuration and real event receipt.
- GA Realtime, DebugView and Tag Assistant receipt or screenshots.
- A successful real-account customer enquiry reaching CRM and GA together.

After deployment and owner configuration:

1. Start with cleared site preferences: reject optional collection and confirm essential navigation/auth/forms still work without Google requests. Verify browser GPC/DNT keeps optional collection off.
2. Grant analytics only. Inspect exactly one Google tag and one initial pageview, then navigate `/`, `/buy`, `/rent`, `/sell`, `/services`, `/about`, `/contact` and a permitted property detail. Check one pathname pageview per navigation, safe URLs/referrers and no pageview duplication on query/hash updates or prefetch.
3. Exercise header/footer/WhatsApp/phone/email/category/service and property links; confirm the documented single event and bounded parameters, without contact destinations or query/form contents. Check keyboard as well as pointer interaction.
4. Start each enquiry form and change several inputs: expect one `form_start` per attempt. Validate invalid input and mocked/controlled failures without a `generate_lead`. With an authorized test lead, confirm backend success first and exactly one `generate_lead`; do not submit unsolicited customer enquiries to generate evidence.
5. Withdraw permission in Cookie preferences. Verify later clicks/navigation do not collect events and optional cookies are cleared; confirm sign-in remains functional. Reopen preferences/reload and verify persistence/expiry behavior.
6. Capture real GA Realtime/DebugView evidence and the release URL/time. DebugView requires an explicit debug session; do not ship the local debug flag globally to obtain screenshots. Compare counts with network collection and the actual CRM confirmation, rather than claiming local mocks establish delivery.

Use separate evidence labels for source tests, mocked events, local browser network, GA account receipt and production. A passing frontend build establishes none of the latter by itself.
