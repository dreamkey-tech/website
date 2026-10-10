# Homepage hero redesign

Reading this as a clean, image-led real estate hero for Kolkata homebuyers, retaining the reference's rounded framing and the client's gold accent.

Scope: homepage header and hero only. The existing routes, navigation labels, SEO metadata, authentication store, lower homepage sections, and other page designs remain in place.

Design settings: variance 6, motion 3, density 3. Existing Tailwind v4, native CSS, native form controls, and the installed Phosphor icon family. No new UI library is needed for this section.

## Components and server rendering

- `HeroSection`: server component composing the photo, copy, and form.
- `HeroCopy`: exact client tagline, description, and consultation link.
- `HeroPropertySearch` / `HeroSearchField`: reusable server components using native selects and a GET form.
- `HomeNavbar` / `BrandLogo`: server components with the existing logo.
- `HeaderAccount` / `MobileMenu`: small interactive components.
- `SiteHeader`: routes the server-rendered homepage header into the existing layout while preserving the old header on other routes.
- The homepage waits on Next.js `connection()` to render for each request.

## Theme and typography

Light mode is selected explicitly with `data-theme="light"` on the root HTML element. The new components only consume semantic `--home-*` tokens in `app/hero.css`. Future dark mode can set `data-theme="dark"`; surfaces, foregrounds, borders, focus colors, and photographic scrims already have values. There is no theme toggle or automatic system theme today.

The lower sections still use their existing dark styling and will be addressed during the requested top-to-bottom redesign.

Primary accent: `#df9e04`, with dark button text for contrast. Text and surfaces use neutral colors. Radii: 28px image frame, 20px popovers, pill controls; mobile search uses a 24px panel.

Plus Jakarta Sans and Space Grotesk retain the existing typography. Playfair Display italic echoes the serif emphasis in the supplied architectural reference. All three fonts are downloaded under `public/fonts`, loaded as compact WOFF2 files with `next/font/local`, and have their Open Font License files alongside them. The loaded font files total about 72 KB. Original TTF sources are retained alongside them.

## Search integration

The form submits `location`, `budget`, `bedrooms`, and `type` to `/buy` using a normal GET request, including before hydration. The existing listing page does not yet consume these preferences. Applying filters to results belongs to the listings/backend work; this hero does not claim a working filtered catalog.

## Image

Generated with the built-in image-generation tool, then revised using exterior photos from Urbana's official gallery as architecture references. The current hero features Urbana-inspired luxury residential high-rise towers, with no balcony or rooftop plants, ground-level landscape greenery, and open sky for the headline. Final asset: `public/images/kolkata-urbana-inspired-hero.webp`, encoded with Sharp at WebP quality 88. This is a generated architectural illustration, not an actual Urbana photograph or an exact site view. The alt text identifies this. The source links and exact final prompt are saved in `docs/urbana-hero-image-prompt.md`. The earlier building variants are retained.

The image uses `next/image`, explicit responsive sizes, a reserved frame, eager loading, and high fetch priority, following the installed Next.js 16 documentation.

## Generation prompt

Use case: ads-marketing
Asset type: photographic background for a premium Kolkata real estate website hero, landscape 16:9, high resolution.
Primary request: create a clean photorealistic architectural image inspired by contemporary Kolkata / New Town living. A beautiful sophisticated mid-rise residential building with sculptural rounded balconies, ivory plaster, natural timber balcony soffits, realistic glazing, plants, and tropical trees is dominant on the RIGHT 60 percent. In the distant lower LEFT a subtle recognizable Kolkata city atmosphere: treelined urban horizon and a distant graceful cable-stayed bridge silhouette inspired by Vidyasagar Setu across the Hooghly. Not a tourist collage. The building is an illustrative imagined residence, not an actual listed property.
Composition: wide low-angle architectural photograph, building rising on right, left 40 percent mostly quiet clean blue sky and distant low horizon for headline overlay. Keep left upper quadrant absolutely free from buildings and foliage. Full bleed image with no border, no UI, no typography.
Style: polished editorial architecture photography, similar to a clean premium real estate reference, realistic materials, no exaggerated sci-fi architecture.
Lighting: soft late-afternoon sunlight on ivory building, gentle clear blue sky, understated warm details, natural lush Bengal greenery, inviting and calm.
Constraints: no people, no text, no logos, no watermark, no UI. No recognizable false property branding. Avoid clutter, orange sunset, city smog, dramatic lens flares, surreal geometry.

## Verification

- `npx tsc --noEmit` passes.
- ESLint passes for all new hero/header components and the updated page/layout.
- `npm run build -- --webpack` passes. Next.js reports `/` as dynamically server-rendered on demand.
- Default Turbopack production builds cannot complete in this execution environment because its worker cannot bind a port; Webpack is the verified build path. The project's normal build script has not been changed.
- Hero headline, image, form, local fonts, and light-theme attribute are present in the server's HTML response.
- Layout checks at 320px, 390px, 768px, and 1440px show no horizontal overflow. The compact search is visible within a 320x740 viewport.
- Native selections submit the selected query parameters to `/buy`. Mobile menu links, Escape dismissal, and focus restoration are verified.
- Dark theme tested at mobile and desktop widths, then restored to explicit light mode.
- Final production Lighthouse mobile audit: performance 73, accessibility 94, FCP 1.3 seconds, LCP 4.0 seconds, total blocking time 520 ms, CLS 0. This audits the entire existing homepage; it is not a hero-only performance score. LCP and main-thread work still exceed the target, so full-page performance optimization remains necessary as the lower sections are rebuilt. Existing eager CSS-background listing photos and below-fold component JavaScript compete with the hero.
- Remaining automated accessibility findings are in the existing footer and carousel pagination, outside this hero/header scope. No new hero/header nodes are among those findings.
- Existing missing `motion/react` dependency was installed and duplicate/unused `Image` imports and a JSX apostrophe in `Locations.tsx` were corrected to unblock project checks.

Final screenshots: `output/hero/desktop-preview.jpg`, `output/hero/mobile-preview.jpg`, and the prepared dark-theme check at `output/hero/dark-preview.jpg`.
