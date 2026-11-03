# Property-category gallery — 3 November 2026

## Current change

The eight Home design-carousel cards now use the requested property categories and newly generated category illustrations. They replace the client-supplied interior reference photos used immediately before this task. This changes the existing gallery, without changing its carousel layout or introducing category filtering.

All eight cards still link to `/buy`. No unsupported property-type query, filtering behavior or category-specific inventory promise was introduced. The artwork represents property categories, not named buildings, verified available listings, real units or actual office premises. The generated scenes do not establish prices, dimensions, availability or service coverage.

## Exact before-and-after map

Source file: [`components/home/design-gallery-data.ts`](../components/home/design-gallery-data.ts). Indexes are zero-based. The “before” values come from the pre-task snapshot, not the older Git HEAD gallery.

| Record index | Before title and client-photo asset | Exact category and new generated asset |
| --- | --- | --- |
| 0 | Characterful homes — `/images/client-2026-11/living-warm-marble.webp` | Apartments / Flats — `/images/property-categories/apartments-flats-v1.webp` |
| 1 | Modern residences — `/images/client-2026-11/living-stone-feature-wall.webp` | Independent Houses — `/images/property-categories/independent-houses-v1.webp` |
| 2 | Designer apartments — `/images/client-2026-11/living-blue-sofa.webp` | Villas — `/images/property-categories/villas-v1.webp` |
| 3 | Family homes — `/images/client-2026-11/living-family-lounge.webp` | Penthouses — `/images/property-categories/penthouses-v1.webp` |
| 4 | City apartments — `/images/client-2026-11/kitchen-sage.webp` | Duplex Homes — `/images/property-categories/duplex-homes-v1.webp` |
| 5 | Signature residences — `/images/client-2026-11/bedroom-cream.webp` | Studio Apartments — `/images/property-categories/studio-apartments-v1.webp` |
| 6 | Room to unwind — `/images/client-2026-11/living-teal-sofa.webp` | Residential Plots — `/images/property-categories/residential-plots-v1.webp` |
| 7 | Contemporary living — `/images/client-2026-11/bedroom-window-marble.webp` | Commercial Properties — offices, shops and showrooms — `/images/property-categories/commercial-properties-v1.webp` |

The commercial record has the title **Commercial Properties** and a separate subtitle, **offices, shops and showrooms**. Its link's accessible name includes both. The other seven records do not have subtitles.

## Generation and asset record

Eight images were generated through the built-in `image_gen` tool, one image for each category. The complete saved prompt set is [`prompts.json`](../output/property-categories-2026-11-03/prompts.json); [`assets.json`](../output/property-categories-2026-11-03/assets.json) records every original generated PNG path, final WebP path, dimensions, bytes and SHA-256 hash.

The eight local WebPs live in `public/images/property-categories/`. Each is **1122 × 1402** pixels, suitable for the existing portrait 4:5 card frame. Together they total **1,612,534 bytes**. The images share a restrained Kolkata-inspired architectural/editorial direction, warm neutral materials and natural light. Prompts request no rendered labels, logos, named brands or people, and prohibit vegetation on buildings, balconies, terraces and rooftops. Prompt constraints describe the generation intent; actual image review and final page QA are recorded separately below.

Original generated PNGs remain at the paths recorded in `assets.json`. The previous client-photo WebPs and their original JPEGs remain intact. No original asset was overwritten or deleted.

## Source and interaction changes

Only three gallery source files belong to this change:

- [`design-gallery-data.ts`](../components/home/design-gallery-data.ts): eight requested labels, generated assets, descriptive illustrative alt text, exact source aspect ratios, and the commercial subtitle; all existing `/buy` destinations remain.
- [`DesignGalleryCard.tsx`](../components/home/DesignGalleryCard.tsx): optional description support; the subtitle renders below the title and joins its accessible label.
- [`DesignGallery.module.css`](../components/home/DesignGallery.module.css): the title/subtitle reveal as a single caption group; a stronger scrim is limited to a card with a description. Flexible caption sizing and word wrapping accommodate long labels beside the arrow.

Existing staggered card positioning, carousel controls and links remain. The original text-first/arrow-after hover and keyboard-focus sequence, touch-visible labels, reduced-motion overrides and arrow direction animation are retained. No new JavaScript state, animation library or dependency was added for the subtitle.

Separate working-tree edits removed Home disclosure notes and the carousel's visible position counter during this task. Those edits were preserved, were not introduced by the category implementation, and are excluded from its reverse patch. Earlier screenshots/checkpoints may still show the counter before that separate edit.

## Preserved surfaces

All hero images remain unchanged, including Home's slideshow, interior-page heroes and AuthPageShell. The Property management image and all Services body images remain in their original restored state from the earlier 3 November partial revert; the Services hero was never replaced. Existing founder/office photographs, Contact imagery, branding/OG images, neighbourhood-map backdrop and backend-owned Buy media remain outside this change.

The real-photo replacements in the eight retained sample Buy image fields and four Rent sample image fields remain. Three Buy sample records still appear in Home Best properties; the live Buy catalogue continues to use backend media. Rent retains its reference-photo disclosure, and property associations remain unconfirmed. Home's disclosure has separately changed and is excluded from the current photo rollback. No author or intent is inferred for that observed source change. The older 25-placement history is preserved in [`client-photo-refresh-2026-11-02.md`](client-photo-refresh-2026-11-02.md).

## Reverting this category update independently

[`revert-categories.patch`](../output/property-categories-2026-11-03/revert-categories.patch) was generated with Python `difflib` by comparing each of the three source files against its pre-task snapshot in [`before/`](../output/property-categories-2026-11-03/before/). It reverses only this category update: the prior client-photo gallery labels/images return, and the previous card/CSS implementation returns. It does not revert Buy/Rent photo changes, restored management/Services images, unrelated source edits, documentation or assets.

Run from a terminal, keeping the repository path quoted. The first command checks compatibility without changing files; run the second only if the check passes and this revert is wanted:

```sh
cd '/home/koushik/Desktop/dreamkey reality'
git apply --reverse --check 'output/property-categories-2026-11-03/revert-categories.patch'
git apply --reverse 'output/property-categories-2026-11-03/revert-categories.patch'
```

If the check fails after later edits, review and reverse the documented changes selectively. Do not force the patch or reset unrelated work. The new generated assets and historical records remain after source reversal. **No reverse patch was applied during this task.**

To reverse only the remaining Buy/Rent client-photo changes while keeping the new category gallery, use the independent three-file `remaining-client-photos.patch` documented in the earlier photo-refresh record. It excludes the separately changed Home disclosure. The older five-file `remaining-replacements.patch` contains both the superseded client-photo gallery layer and a different Home disclosure state; it is no longer directly reversible against the current source.

## Verification status

The eight generated outputs were inspected by the implementing agent. The saved asset manifest supplies their dimensions, hashes and original output locations; source records match the eight requested categories and keep `/buy` links. Subtitle work passed scoped ESLint and whitespace checks before integration.

Production webpack build including TypeScript, scoped ESLint, source formatting and whitespace checks pass. Both the category reverse patch and the independent Buy/Rent photo reverse patch pass dry checks without being applied. Local production SSR contains all eight category images with descriptive illustrative alt text and responsive sizes, plus the complete commercial subtitle/accessibility label. All eight public WebPs and their 640px optimized responses return HTTP 200 image content. All 24 previously protected hero source/asset hashes are unchanged, and management/Services sources still match their restored versions.

Browser checks at 1280px desktop confirm the category imagery, keyboard caption/arrow reveal, carousel focus navigation and commercial subtitle fit. At 320px and 390px, all eight caption layouts have no text overflow or arrow overlap and the page has no horizontal overflow; all eight gallery images loaded at the 390px checkpoint. Saved screenshots and `browser-verification.json` are in the category output folder. This is viewport simulation, not a physical-device test; native touch/hover and reduced-motion rendering were not newly exercised beyond reviewing their retained implementation.

Local Home Lighthouse scores are accessibility 100 / best practices 96; the remaining console finding is the existing anonymous session/local analytics requests. Evidence: `delivery-verification.json`, `browser-verification.json`, `lighthouse-summary.json` and the raw report in `output/property-categories-2026-11-03/`. These checks do not establish client approval, actual inventory association, deployment or field performance. No commit or push was performed.

The final production rebuild also passes after the separate counter removal. `gallery-final.jpg` shows that final served version with the category caption revealed by keyboard focus. A local production preview was left running at `http://127.0.0.1:3041/#designer-apartments` for review; that preview is not a deployment.
