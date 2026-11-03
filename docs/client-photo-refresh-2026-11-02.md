# Client photograph refresh — 2 November 2026

## Latest status — category artwork replaces the gallery, 3 November 2026

The Home design carousel now uses eight newly generated property-category images and the requested category labels. Its eight client-photo references recorded below are superseded; the original files remain intact. See [`property-category-gallery-2026-11-03.md`](property-category-gallery-2026-11-03.md) for the exact category map, prompts, generated asset manifest and a three-file patch that can reverse that category update independently.

**Client photographs still retained:** eight sample Buy image fields, including the three Home featured records (IDs `[2, 8, 1]`), and four Rent sample-card image fields. These are 12 image fields across two data files, with the retained Rent reference-photo disclosure in one additional file. Home's disclosure has separately changed and is excluded from the current rollback; no author or intent is inferred. Five Buy sample records remain unused by the live API-backed Buy catalogue. The property-management backdrop and all Services body-card photos remain restored to their pre-refresh versions. All heroes, including Auth, remain unchanged.

The active independent rollback file for those remaining Buy/Rent photos is now [`remaining-client-photos.patch`](../output/client-photos-2026-11-02/remaining-client-photos.patch). It covers three files and excludes both the category gallery and separately changed Home disclosure, so Buy/Rent references can be restored while retaining those changes. The earlier five-file `remaining-replacements.patch` is historical: it includes the superseded client-photo gallery layer and a different Home disclosure state and cannot be fully reversed directly against the current source. The original seven-file patch also remains historical. Neither older patch has been overwritten.

Both the category-only and current three-file client-photo reverse dry checks pass; neither patch was applied. Final production/browser verification for the category update is pending with the implementing agent. The earlier partial-revert checks below apply to their recorded revision.

## Earlier status — partial revert, 3 November 2026 (historical)

This was the state immediately after the management/Services partial revert and before the category-artwork update above.

At the user's request, the property-management banner and all four Services body-card image/alt pairs have been restored to their pre-refresh versions. The Services hero was never replaced and remains unchanged. The five reverted placements are:

| Placement | Client photo removed from this placement | Restored asset |
| --- | --- | --- |
| Home PropertyManagement background | `/images/client-2026-11/living-open-plan.webp` | `/images/pages/about-studio.webp` |
| Services buying card | `/images/client-2026-11/living-blue-sofa.webp` | `/images/Buying.webp` |
| Services renting card | `/images/client-2026-11/bedroom-daylight.webp` | `/images/service/Thoughtful_Rental_Search_at_Home.webp` |
| Services selling card | `/images/client-2026-11/living-stone-feature-wall.webp` | `/images/Selling.webp` |
| Services consulting card | `/images/client-2026-11/kitchen-warm-wood.webp` | `/images/service/Real_Estate_Investment_Consultation.webp` |

**Retained:** all eight Home design-carousel replacements; all eight sample Buy image fields, including the three featured Home cards (IDs `[2, 8, 1]`); all four Rent sample-card replacements; and the Home/Rent sample-photo disclosures. These are 20 remaining image fields in five application files. Five Buy sample records remain unused by the active API-backed Buy catalogue. Every hero, including Auth, and every other exception recorded below remain protected. The original 15 optimized files and 25-row mapping are retained for history; a photograph restored out of one section may still be used in another.

At that checkpoint, [`remaining-replacements.patch`](../output/client-photos-2026-11-02/remaining-replacements.patch) covered the five still-changed application files. It is now historical, as explained above. The original seven-file `replacements.patch` was already historical because five placements had been reverted. Use the current three-file instructions below for an independent Buy/Rent photo rollback.

**Partial-revert verification:** `PropertyManagement.tsx`, `services-content.ts`, and the untouched `ServicesHero.tsx` exactly match their pre-refresh HEAD versions. The implementing agent reports a passing production webpack build including TypeScript, scoped ESLint and whitespace checks, with all six restored/preserved image assets present. The remaining-only reverse-patch dry check passes; no patch was applied. These are source/build checks, with no fresh browser or HTTP verification for the 3 November partial revert. Customer approval and deployment remain unverified.

## Original 2 November scope and evidence

The user supplied `/home/koushik/Downloads/images/`, asked to replace suitable website imagery with these real photographs, explicitly excluded hero images, and requested a record supporting a later revert. All 96 JPEGs were reviewed in contact sheets; they show home interiors. Fifteen selected photographs initially served 25 image fields across five source/data files. Two additional files updated sample-listing disclosures, making seven application files in the original refresh.

The [source inventory](../output/client-photos-2026-11-02/source-inventory.json) records every supplied JPEG, its source hash and dimensions; selected entries also record the new public asset path, output hash and bytes. Contact sheets in [the review folder](../output/client-photos-2026-11-02/) preserve the selection review. Original JPEGs in Downloads and every previous repository image asset are retained unchanged. New WebP copies live under `public/images/client-2026-11/`. Conversion applies EXIF orientation, uses quality 85 at native dimensions, omits metadata, and makes no crop, retouching or upscale. The 15 outputs total 1,923,320 bytes. Display frames retain their existing CSS crops.

**Property associations remain unconfirmed.** No filename, room appearance or selection proves a property name, location, dimensions, price, availability, ownership or rights of publication. Existing sample names and facts remain illustrative. These client-supplied photographs are reference imagery, not verified photographs of the named sample listings. Home and Rent disclosures now explain this. No inventory association is sent to the CRM or used to replace API photos.

## Original complete replacement map — historical

There are 25 original rows/placements below, using 15 unique optimized assets. The management and four Services rows were subsequently reverted; the eight gallery rows were then superseded by generated category artwork. Only the eight sample Buy and four Rent photo rows remain current. Repeated assets were intentionally reused and converted only once. Every source JPEG listed is located in `/home/koushik/Downloads/images/`. Previous hero-named assets in these tables were removed only from the specified nonhero references: their files and actual hero references remain intact.

### Home design carousel

File: [`components/home/design-gallery-data.ts`](../components/home/design-gallery-data.ts). Array indexes below are zero-based.

| Record / placement | Previous asset → replacement asset | Exact original JPEG filename |
| --- | --- | --- |
| DESIGN_GALLERY_HOMES[0] — Characterful homes | `/images/design-gallery/villa-charcoal.webp` → `/images/client-2026-11/living-warm-marble.webp` | `WhatsApp Image 2026-11-02 at 1.28.49 PM (1).jpeg` (source #16) |
| DESIGN_GALLERY_HOMES[1] — Modern residences | `/images/design-gallery/villa-ivory.webp` → `/images/client-2026-11/living-stone-feature-wall.webp` | `WhatsApp Image 2026-11-02 at 1.29.10 PM (1).jpeg` (source #55) |
| DESIGN_GALLERY_HOMES[2] — Designer apartments | `/images/design-gallery/designer-interior.webp` → `/images/client-2026-11/living-blue-sofa.webp` | `WhatsApp Image 2026-11-02 at 1.29.26 PM (1).jpeg` (source #88) |
| DESIGN_GALLERY_HOMES[3] — Family homes | `/images/design-gallery/villa-timber.webp` → `/images/client-2026-11/living-family-lounge.webp` | `WhatsApp Image 2026-11-02 at 1.29.03 PM.jpeg` (source #43) |
| DESIGN_GALLERY_HOMES[4] — City apartments | `/images/pages/rent-living.webp` → `/images/client-2026-11/kitchen-sage.webp` | `WhatsApp Image 2026-11-02 at 1.29.27 PM (1).jpeg` (source #90) |
| DESIGN_GALLERY_HOMES[5] — Signature residences | `/images/pages/sell-residence.webp` → `/images/client-2026-11/bedroom-cream.webp` | `WhatsApp Image 2026-11-02 at 1.29.16 PM (1).jpeg` (source #68) |
| DESIGN_GALLERY_HOMES[6] — Room to unwind | `/images/kolkata-urbana-inspired-hero.webp` → `/images/client-2026-11/living-teal-sofa.webp` | `WhatsApp Image 2026-11-02 at 1.29.20 PM.jpeg` (source #77) |
| DESIGN_GALLERY_HOMES[7] — Contemporary living | `/images/kolkata-residence-hero-v2.webp` → `/images/client-2026-11/bedroom-window-marble.webp` | `WhatsApp Image 2026-11-02 at 1.28.53 PM (1).jpeg` (source #25) |

### Home property-management banner

File: [`components/home/PropertyManagement.tsx`](../components/home/PropertyManagement.tsx).

| Record / placement | Previous asset → replacement asset | Exact original JPEG filename |
| --- | --- | --- |
| PropertyManagement background image | `/images/pages/about-studio.webp` → `/images/client-2026-11/living-open-plan.webp` | `WhatsApp Image 2026-11-02 at 1.28.46 PM (1).jpeg` (source #11) |

### Retained sample Buy catalogue / Home Best properties

File: [`components/buy/buy-data.ts`](../components/buy/buy-data.ts). Array indexes below are zero-based.

| Record / placement | Previous asset → replacement asset | Exact original JPEG filename |
| --- | --- | --- |
| BUY_HOMES[0] — ID 1: DreamKey Altura — active Home feature | `/images/kolkata-urbana-inspired-hero.webp` → `/images/client-2026-11/living-dining-wide.webp` | `WhatsApp Image 2026-11-02 at 1.28.42 PM.jpeg` (source #4) |
| BUY_HOMES[1] — ID 2: DreamKey Residences — active Home feature | `/images/pages/sell-residence.webp` → `/images/client-2026-11/living-ivory-green-wide.webp` | `WhatsApp Image 2026-11-02 at 1.29.08 PM (1).jpeg` (source #52) |
| BUY_HOMES[2] — ID 3: DreamKey Heights — retained, not an active Buy listing | `/images/pages/contact-kolkata.webp` → `/images/client-2026-11/living-teal-wide.webp` | `WhatsApp Image 2026-11-02 at 1.29.22 PM (1).jpeg` (source #81) |
| BUY_HOMES[3] — ID 4: DreamKey Icon — retained, not an active Buy listing | `/images/pages/rent-living.webp` → `/images/client-2026-11/bedroom-window-marble.webp` | `WhatsApp Image 2026-11-02 at 1.28.53 PM (1).jpeg` (source #25) |
| BUY_HOMES[4] — ID 5: DreamKey Grand — retained, not an active Buy listing | `/images/kolkata-urbana-inspired-hero.webp` → `/images/client-2026-11/living-dining-wide.webp` | `WhatsApp Image 2026-11-02 at 1.28.42 PM.jpeg` (source #4) |
| BUY_HOMES[5] — ID 6: DreamKey Prime — retained, not an active Buy listing | `/images/design-gallery/designer-interior.webp` → `/images/client-2026-11/living-family-lounge.webp` | `WhatsApp Image 2026-11-02 at 1.29.03 PM.jpeg` (source #43) |
| BUY_HOMES[6] — ID 7: DreamKey Sky Mansions — retained, not an active Buy listing | `/images/pages/sell-residence.webp` → `/images/client-2026-11/living-warm-marble.webp` | `WhatsApp Image 2026-11-02 at 1.28.49 PM (1).jpeg` (source #16) |
| BUY_HOMES[7] — ID 8: DreamKey Serene Villas — active Home feature | `/images/design-gallery/villa-timber.webp` → `/images/client-2026-11/living-warm-marble.webp` | `WhatsApp Image 2026-11-02 at 1.28.49 PM (1).jpeg` (source #16) |

### Rent sample collection

File: [`components/pages/rental-data.ts`](../components/pages/rental-data.ts). Array indexes below are zero-based.

| Record / placement | Previous asset → replacement asset | Exact original JPEG filename |
| --- | --- | --- |
| RENTAL_HOMES[0] — new-town-three: Room for a slower morning | `/images/pages/rent-living.webp` → `/images/client-2026-11/living-teal-wide.webp` | `WhatsApp Image 2026-11-02 at 1.29.22 PM (1).jpeg` (source #81) |
| RENTAL_HOMES[1] — salt-lake-two: A little closer to everything | `/images/design-gallery/designer-interior.webp` → `/images/client-2026-11/bedroom-cream.webp` | `WhatsApp Image 2026-11-02 at 1.29.16 PM (1).jpeg` (source #68) |
| RENTAL_HOMES[2] — bypass-four: Space for the whole family | `/images/pages/sell-residence.webp` → `/images/client-2026-11/living-ivory-green-wide.webp` | `WhatsApp Image 2026-11-02 at 1.29.08 PM (1).jpeg` (source #52) |
| RENTAL_HOMES[3] — new-town-two: Make the city feel like home | `/images/kolkata-urbana-inspired-hero.webp` → `/images/client-2026-11/living-unfurnished-stone.webp` | `WhatsApp Image 2026-11-02 at 1.29.12 PM (1).jpeg` (source #59) |

### Services body cards

File: [`components/services/services-content.ts`](../components/services/services-content.ts). Array indexes below are zero-based.

| Record / placement | Previous asset → replacement asset | Exact original JPEG filename |
| --- | --- | --- |
| propertyServices[0] — buying: Find a place to buy. | `/images/Buying.webp` → `/images/client-2026-11/living-blue-sofa.webp` | `WhatsApp Image 2026-11-02 at 1.29.26 PM (1).jpeg` (source #88) |
| propertyServices[1] — renting: Find your next rental. | `/images/service/Thoughtful_Rental_Search_at_Home.webp` → `/images/client-2026-11/bedroom-daylight.webp` | `WhatsApp Image 2026-11-02 at 1.29.03 PM (1).jpeg` (source #42) |
| propertyServices[2] — selling: Give your property a new chapter. | `/images/Selling.webp` → `/images/client-2026-11/living-stone-feature-wall.webp` | `WhatsApp Image 2026-11-02 at 1.29.10 PM (1).jpeg` (source #55) |
| propertyServices[3] — consulting: Make sense of your options. | `/images/service/Real_Estate_Investment_Consultation.webp` → `/images/client-2026-11/kitchen-warm-wood.webp` | `WhatsApp Image 2026-11-02 at 1.28.53 PM.jpeg` (source #26) |

## Original accompanying application changes

- [`components/home/BestProperties.tsx`](../components/home/BestProperties.tsx): the disclosure distinguishes real reference photographs from illustrative named listings. Active featured IDs remain `[2, 8, 1]`; only those three of eight retained Buy sample records appear on Home. The remaining five updated sample image fields are not mounted in the live API-backed Buy catalogue.
- [`components/pages/RentalBrowser.tsx`](../components/pages/RentalBrowser.tsx): the disclosure similarly retains illustrative homes/rents and explains unconfirmed photo associations.
- Carousel descriptive alt text follows the new photographs. Titles “Private villas” and “Skyline homes” become “Characterful homes” and “Room to unwind” because no villa exterior or skyline photo was supplied. Explicit image aspect ratios match the selected source dimensions; links and hover/scroll behavior are retained.
- Buy sample and rental alt text now describes reference photographs. Service image alt text and the management backdrop description follow the selected visible rooms. Prices, specifications, service prose, API behavior, authentication and contact details are unchanged.

## Images deliberately preserved

- **Every hero image and hero file:** Home slideshow records, including the experimental street opening and commented riverside option; all underlying image files; Sell, About and Services opening photos; commented Buy/Rent introductions; Careers hero; and the AuthPageShell image used by Login/Register/Password Recovery. Protecting these follows the hero exclusion conservatively. Shared hero-named assets are not overwritten when their nonhero uses change.
- **Existing real identity/office photos:** founder portraits, About team image, and four-image office gallery remain. Unrelated room photographs are not substituted for identified people or the office. The Contact office/conversation image is also retained.
- **Live API media:** Buy cover images, authenticated galleries and floor plans remain supplied by the backend. No local room photo is attached to a real listing without an established association.
- **Branding:** logo, icons, favicon, Open Graph/social preview image and map embeds remain unchanged.
- **Property neighbourhood backdrop:** `components/property/PropertyLocation.tsx` retains `/images/pages/contact-kolkata.webp`. Supplied interior photos cannot represent an exterior neighbourhood overview; its existing illustrative/not-exact-location disclosure remains.
- **Inactive legacy source and historical sample support galleries:** unmounted old Home/Buy/Rent components and unused sample-detail supporting photos remain. They are retained for history/restoration.

## Current rollback instructions — retained Buy/Rent photographs only

[`remaining-client-photos.patch`](../output/client-photos-2026-11-02/remaining-client-photos.patch) captures only the three application-file diffs that retain client photographs after the 3 November category update, against pre-refresh Git HEAD:

- `components/buy/buy-data.ts`
- `components/pages/RentalBrowser.tsx`
- `components/pages/rental-data.ts`

It includes the eight sample Buy and four Rent image/alt references and the retained Rent sample-disclosure update. It excludes `BestProperties.tsx` and its separately changed Home disclosure, all three category-gallery source files, already-restored management/Services files, photographs, this document, handoff notes and verification artifacts. Existing assets were not overwritten, so reversing these remaining source changes restores their previous visual references while keeping the generated category gallery and other observed source changes.

The earlier [`remaining-replacements.patch`](../output/client-photos-2026-11-02/remaining-replacements.patch) remains an unchanged historical five-file snapshot from immediately after the management/Services partial revert. It includes the client-photo gallery version that the category update replaced and an earlier Home disclosure state. **Its full reverse does not currently apply, even if only the category layer is first restored.** Preserve separately changed source and use the current independent patches rather than forcing or combining historical full patches.

The original [`replacements.patch`](../output/client-photos-2026-11-02/replacements.patch) remains an unchanged historical seven-file snapshot of the full 2 November refresh. **Do not use its full reverse on the current tree:** it includes the management and Services changes already reverted on 3 November and will fail its check. It is retained to explain the original 25-row map, not as the current rollback command.

Run the following from a terminal. Quoting the repository path handles its space. The first Git command is a dry check; run the second only if the check passes and the revert is still wanted:

```sh
cd '/home/koushik/Desktop/dreamkey reality'
git apply --reverse --check 'output/client-photos-2026-11-02/remaining-client-photos.patch'
git apply --reverse 'output/client-photos-2026-11-02/remaining-client-photos.patch'
```

A failed check means current source no longer matches the saved patch context. Review differences and revert documented placements selectively; do not force application or reset unrelated edits. Reversing this patch does not remove new photo assets, this record or its inventory, and does not undo unrelated code. Retain unused assets for review, or remove them separately only after checking that no remaining references use them. **No reverse patch was applied during implementation.**

## Original 2 November verification — historical

Scoped ESLint and the production webpack build, including TypeScript, passed as reported by the implementing agent. All 24 protected hero source/asset hashes were unchanged. An independent execution of the four changed data arrays confirmed preserved record counts/order and all nonimage business facts; the only additional carousel changes were the two documented titles and exact aspect ratios. The inventory records 15 native-dimension, metadata-stripped WebP copies. The original full reverse-patch dry check passed before the 3 November partial revert, without applying a patch.

Local production HTTP/SSR checks passed on Home, Rent, Services, Sell, About, Login and Contact: exactly 12/4/4 new image elements appear on the three changed surfaces and none on the preserved pages. Every replacement has descriptive alt text and responsive sizes. All 15 public WebPs and their 640px optimized responses return HTTP 200 with image media types. Evidence: `output/client-photos-2026-11-02/delivery-verification.json`.

Browser review checked the desktop Home gallery, its Next control, management backdrop/readability and featured-card crops; 390px mobile gallery, rental cards and service-card crops fit without horizontal page overflow. Screenshots and `browser-verification.json` are in the same review folder. Original phone-camera perspective/lighting remain; no retouching was applied. Native touch/swipe, every carousel position, physical devices and future-dark appearance were not exhaustively rechecked. The `services-narrow.jpg` screenshot shows the preserved Services hero; the new service cards appear in `services-mobile.jpg`.

Local Home Lighthouse scores: accessibility 100 / best practices 96. The remaining console-error finding relates to existing anonymous session/local analytics requests; the audit does not measure deployment or real-user performance. Source/build/browser checks do not establish customer approval, verified inventory associations or deployment. This refresh has not been committed or pushed.
