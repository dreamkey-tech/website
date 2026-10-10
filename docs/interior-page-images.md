# Interior page imagery

Generated with the built-in image generation tool. All scenes are illustrative, not photographs of available properties or Dream Key’s office. Originals are retained in Codex’s generated image directory; project files are WebP encodings.

This description applies to the generated assets documented below. The About page now uses the client-supplied office photographs listed in the final section instead of `about-studio.webp`. That illustrative asset remains available to the other pages that use it.

Design read: a calm editorial real-estate website for Kolkata buyers, sellers and tenants, continuing the landing page’s existing brand language. DESIGN_VARIANCE: 6; MOTION_INTENSITY: 3; VISUAL_DENSITY: 3.

## sell-residence

Asset: `public/images/pages/sell-residence.webp`

Exact prompt:

> Use case: ads-marketing. Create a standalone clean premium architectural editorial photograph for a Kolkata real estate consultancy website. Wide landscape aspect ratio 3:2. Natural photorealistic materials, calm daylight, ivory/light gray walls, restrained charcoal details, a few warm wood details, uncluttered polished composition. No text, logo, watermark or people. No plants or planters on balconies, facades or roofs. This is an illustrative scene, not a real listed property or actual company office. Subject: an elegant contemporary Indian apartment living room overlooking Kolkata-inspired high-rise residences through large clean windows. Generous light gray sofa, dark wood coffee table, refined natural stone floor, softly lit afternoon sun, well-proportioned inviting space with clear architectural lines. Windows have plain balcony railings and no balcony plants. Camera from inside the lounge, full room width, high-quality understated luxury, no ornate decor.

## rent-living

Asset: `public/images/pages/rent-living.webp`

Exact prompt:

> Use case: ads-marketing. Create a standalone clean premium architectural editorial photograph for a Kolkata real estate consultancy website. Wide landscape aspect ratio 3:2. Natural photorealistic materials, calm daylight, ivory/light gray walls, restrained charcoal details, a few warm wood details, uncluttered polished composition. No text, logo, watermark or people. No plants or planters on balconies, facades or roofs. This is an illustrative scene, not a real listed property or actual company office. Subject: a bright comfortable contemporary Indian rental apartment living room, pale neutral upholstered sofa, modest dining nook, ivory curtains, light oak furniture and wide windows revealing distant East Kolkata residential towers. Stylish but attainable, uncluttered real home, welcoming morning sunlight. Camera from one corner at eye level, composition showing both living area and window, gentle neutral palette, no indoor trees or balcony gardens.

## about-studio

Asset: `public/images/pages/about-studio.webp`

Exact prompt:

> Use case: ads-marketing. Create a standalone clean premium architectural editorial photograph for a Kolkata real estate consultancy website. Wide landscape aspect ratio 3:2. Natural photorealistic materials, calm daylight, ivory/light gray walls, restrained charcoal details, a few warm wood details, uncluttered polished composition. No text, logo, watermark or people. No plants or planters on balconies, facades or roofs. This is an illustrative scene, not a real listed property or actual company office. Subject: a thoughtful modern real estate advisory office interior in Kolkata, a small meeting table, two simple charcoal chairs, light oak cabinetry, pale plaster walls, a large daylight window and a small stack of architecture books. No branding or readable text, no people, no giant office or corporate glass tower. Close editorial photo of a quiet welcoming consultation space, subtle warm late-afternoon light, realistically sized small consultancy office.

## contact-kolkata

Asset: `public/images/pages/contact-kolkata.webp`

Exact prompt:

> Use case: ads-marketing. Create a standalone clean premium architectural editorial photograph for a Kolkata real estate consultancy website. Wide landscape aspect ratio 3:2. Natural photorealistic materials, calm daylight, ivory/light gray walls, restrained charcoal details, a few warm wood details, uncluttered polished composition. No text, logo, watermark or people. No plants or planters on balconies, facades or roofs. This is an illustrative scene, not a real listed property or actual company office. Subject: Kolkata New Town-inspired urban neighbourhood seen from a modest elevated viewpoint, a neat broad avenue with palm trees and mature ground-level greenery, contemporary residential towers with simple white/gray rectilinear facades and realistic Indian urban streetscape. Low afternoon sunlight, clean natural blue sky, calm welcoming authentic Bengal city atmosphere. Composition led by the avenue toward high-rises, no foreign skyline, no famous monument collage, no waterfront claim.

## Client-supplied About photographs, 9 October 2026

Five renamed HEIC photographs from the folder supplied by the client were decoded with the bundled `heif-convert`, oriented using their EXIF metadata and converted from their embedded colour profile to sRGB. WebP copies use quality 85, preserve the photographs without generative retouching, and omit camera/location metadata. Original HEIC files and the old website assets are retained. New filenames avoid reusing cached portrait URLs.

| Source filename | Website asset                           | Use                                 |
| --------------- | --------------------------------------- | ----------------------------------- |
| `Sayan.HEIC`    | `public/about/sayan-portrait.webp`      | Sayan Dutta portrait, 900 × 1200    |
| `Siddhant.HEIC` | `public/about/siddhant-portrait.webp`   | Siddhant Singh portrait, 900 × 1200 |
| `office2.HEIC`  | `public/about/office-meetingRoom.webp` | About hero, 1350 × 1800             |
| `office1.HEIC`  | `public/about/officeWorkspace.webp`    | Office gallery, 1350 × 1800         |
| `office3.HEIC`  | `public/about/officeExterior.webp`     | Office gallery, 1350 × 1800         |

The two replacement portraits use individual CSS object positions to keep faces inside the existing square cards; Mainak's photograph keeps its existing position. The reusable server-rendered `OfficeGallery` displays the two remaining office photographs with theme tokens and a single-column mobile layout. The About hero now has accurate office alt text. Other pages keep their existing illustrative images.

The five source photographs and converted files were visually inspected. Browser layout verification remains limited by the preview tab's existing unsupported connection-error URL; build, lint and production media delivery are checked separately.

Verification passed: production webpack build including TypeScript, scoped ESLint, formatting and diff whitespace checks. The production About response contains all five new image paths, correct portrait names and object positions, and Mainak's existing photograph; the illustrative office image is no longer rendered on this page. Next's image endpoint successfully delivered resized hero and portrait files. Reopened public WebP assets contain no EXIF or XMP metadata.


## Four-photo office bento follow-up — 10 October 2026

The user requested a four-image bento under “A place for real conversations.” using suitable current imagery that they may replace later. `OfficeGallery.tsx` now reads `office-gallery-photos.ts`: exterior sign, workspace, meeting room and the existing matching-polo group photo. The group image was already present in the user's tree and About hero; its provenance/identities were not independently confirmed. No new image generation or alterations to client photos were performed.

Desktop uses a 12-column grid with 7/5 then 5/7 spans and equal rows; tablet uses two equal columns, mobile a 4:3 single-column stack. Theme surfaces, rounded frames, heading and descriptive copy are preserved. Swap paths, alt text and crop positions together in the data file. The earlier hero/image-role descriptions above are historical; concurrent user edits selected the group photo as About hero before this follow-up.

Scoped lint, TypeScript, final production webpack build, formatting/whitespace, four-photo SSR and image-delivery checks pass. Supported live preview reviewed the desktop, tablet and phone layouts; no horizontal overflow at 1575, 768, 390 or 320px. The desktop sign/faces remain visible. Screenshot: `/tmp/dreamkey-about-bento-desktop.png`; SSR evidence: `/tmp/dreamkey-about-bento-ssr.json`. No new animation or active dark mode was added.
