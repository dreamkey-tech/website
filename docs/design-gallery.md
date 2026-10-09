# Designer apartments gallery

Scope: four staggered photographic cards immediately after the homepage hero, based on the supplied split reference. The reference's About Us block is omitted. The hero and existing lower sections are retained.

Design settings: variance 6, motion 3, density 3. Native CSS grid, existing Phosphor icons, existing fonts and semantic `--home-*` theme tokens. Desktop offsets are 0 / 48 / 96 / 0 px. Mobile uses a single column with wider crops and no offsets. All four cards are interactive and link to the existing `/buy` route; the gallery makes no inventory or filter claims.

`DesignGallery` composes a data array and the reusable `DesignGalleryCard`, both Server Components. Images use `next/image`, responsive sizes, lazy loading and reserved aspect ratios. Hover feedback respects reduced motion. Focus has an explicit outline. The section inherits the prepared light/dark tokens; light stays the current page mode.

On fine-pointer devices, hovering or keyboard-focusing any card reveals its title first. The arrow follows after 140 ms, initially pointing right, then rotates 45 degrees to the top-right direction over a 480 ms animation. Leaving the card hides the overlay and resets the arrow for the next entry. Touch devices keep the title and arrow visible. Reduced motion removes the movement and rotation. This interaction uses CSS only, retaining Server Components and adding no client JavaScript. Hidden, hovered, and keyboard-focus states were verified in the browser.

The four photographs were created with the built-in image-generation tool, then resized to 800 px wide and encoded as WebP quality 85 using Sharp. They depict illustrative imagined homes/interiors, not actual listings. Generation prompts follow.

## Verification

- ESLint passes for both new components and the homepage.
- `npm run build -- --webpack` passes, including TypeScript; the homepage remains dynamically server-rendered.
- The gallery section and title appear in the server HTML response with explicit light mode.
- Visually checked at 1440, 768, and 390 px. The 320 px production check has four loaded images and no horizontal overflow.
- The interior card opens `/buy`. Dark tokens were visually tested in development, then the root was restored to light mode before the production build.
- Production Lighthouse mobile audit of the entire homepage: performance 69, accessibility 94, LCP 4.1 s, CLS 0. The existing whole-page performance limitations remain; the new gallery adds no client animation code and uses lazy optimized images. No reported audit finding references the new gallery.
- Screenshots: `output/hero/design-gallery-desktop.jpg`, `output/hero/design-gallery-mobile.jpg`, `output/hero/design-gallery-dark.jpg`. Full audit: `output/hero/design-gallery-lighthouse.json`.

## villa-charcoal

Asset: `public/images/design-gallery/villa-charcoal.webp`

Use case: ads-marketing. Create a standalone photorealistic editorial real estate photograph for a portrait photo card in a clean premium Kolkata property website. Portrait aspect ratio 4:5. Restrained clean architectural photography, realistic materials, soft natural daylight, uncluttered framing, no text, no typography, no logo, no watermark, no people. No plants, planters, vines, rooftop gardens or vegetation on buildings or balconies; ground-level trees and landscaping are allowed. Illustrative imagined property, not an actual listing. Subject: a sophisticated contemporary Indian two-storey detached residence photographed from street level at a gentle three-quarter angle. Charcoal gray stone lower facade, black sloping roof with broad clean overhang, upper white plaster and clear glass balcony railing, a softly illuminated entry. Frame the entire house with a little clear pale blue sky above and modest ground-level landscaping. Crisp real facade details and grounded proportions.

## villa-ivory

Asset: `public/images/design-gallery/villa-ivory.webp`

Use case: ads-marketing. Create a standalone photorealistic editorial real estate photograph for a portrait photo card in a clean premium Kolkata property website. Portrait aspect ratio 4:5. Restrained clean architectural photography, realistic materials, soft natural daylight, uncluttered framing, no text, no typography, no logo, no watermark, no people. No plants, planters, vines, rooftop gardens or vegetation on buildings or balconies; ground-level trees and landscaping are allowed. Illustrative imagined property, not an actual listing. Subject: a sculptural modern Indian detached home with crisp angular ivory plaster and light-gray concrete facades, large recessed windows, a clean cantilevered upper volume and simple balcony without planters. Close three-quarter view from a low angle, pale blue sky, trimmed grass at ground level only. Architecture fills most of the frame. Refined geometric building, realistic for a luxury Kolkata suburb, bright but softly lit.

## designer-interior

Asset: `public/images/design-gallery/designer-interior.webp`

Use case: ads-marketing. Create a standalone photorealistic editorial real estate photograph for a portrait photo card in a clean premium Kolkata property website. Portrait aspect ratio 4:5. Restrained clean architectural photography, realistic materials, soft natural daylight, uncluttered framing, no text, no typography, no logo, no watermark, no people. No plants, planters, vines, rooftop gardens or vegetation on buildings or balconies; ground-level trees and landscaping are allowed. Illustrative imagined property, not an actual listing. Subject: a quiet designer apartment interior vignette, a black leather lounge chair with slim sculptural curved black metal legs positioned in the LOWER HALF against a smooth warm charcoal/taupe wall, a minimal side table with a matte dark vase and dried slender branches to the lower right. Soft window light from the left, subtle textured rug and wood floor, natural shadows. The UPPER THIRD of the photograph is entirely uncluttered dark taupe wall with no objects, reserved for an eventual white title overlay. No windows in the upper half. Sophisticated restrained interior, similar to an editorial furniture photograph.

## villa-timber

Asset: `public/images/design-gallery/villa-timber.webp`

Use case: ads-marketing. Create a standalone photorealistic editorial real estate photograph for a portrait photo card in a clean premium Kolkata property website. Portrait aspect ratio 4:5. Restrained clean architectural photography, realistic materials, soft natural daylight, uncluttered framing, no text, no typography, no logo, no watermark, no people. No plants, planters, vines, rooftop gardens or vegetation on buildings or balconies; ground-level trees and landscaping are allowed. Illustrative imagined property, not an actual listing. Subject: a contemporary two-storey Indian luxury residence with natural timber-clad ground floor, warm light-gray stone, a broad shallow angled roof, large dark-framed windows and a simple upper balcony. Three-quarter street-level perspective, pale blue lightly cloudy sky above, paved foreground with modest ground-level trees at edges. Complete house framed tightly but with breathing room, realistic materials and architecture, soft late afternoon light.

All-card update: Private villas, Modern residences, Designer apartments, and Family homes share the same reusable link and CSS animation. Labels and arrows were verified on each additional card. The section has one accessible heading and each card has its own h3, avoiding duplicate IDs. ESLint and the production build pass.
