# Landing page continuation

## Design and scope

Reading this as a Kolkata residential real estate landing page with the clean, photographic editorial language of the user's reference. Design variance 6, motion intensity 3, visual density 3: asymmetric property sizes, generous whitespace, and small interaction cues. The existing Jakarta / Playfair italic pairing, neutral semantic colors, gold accent, image radii, and pill actions are retained. Native CSS modules and existing Phosphor icons provide the implementation; no new dependency is needed.

The prior page moved from the new light hero and design gallery into dark carousel, comparison, process, trust-statistic, FAQ, and simulated enquiry sections. Those sections are no longer rendered on the landing page. Their source files remain available for other work. The hero, high-rise image, search, and staggered design gallery are unchanged.

The new sequence is hero, design gallery, property management banner, Best properties, client stories, compact enquiry CTA, and light footer. `properties`, `testimonials`, `contact`, and `contact-form` anchors remain available. Root metadata, route slugs, logo, privacy text, and terms text are preserved.

## Components and content

- `PropertyManagement` uses the existing generated Kolkata office photograph. The copy stays within the owner services already described by the project: presentation, enquiries, and tenant connections. It links to Contact.
- `BestProperties` and `HomePropertyCard` share the Buy catalog. Three illustrative properties appear in a grid with one larger photograph. Prices, configurations, sizes, and descriptions come from existing records. Cards open Contact with the property prefilled. View all properties navigates to Buy.
- `ClientStories` supplies the editorial heading and explicit sample-content note. `TestimonialSlider` retains the five existing quotes and attributions, replaces random remote avatars with initials, removes unverified rating statistics, and uses manual previous/next controls. The quote transition respects reduced motion; a stable polite live region announces changes. There is no autoplay.
- `HomeContactCTA` replaces the old form, which only simulated a submission with a timeout, with a real Contact link and telephone link. The working Contact form remains the enquiry destination.
- `HomeFooter` provides property, company, contact, and legal links in the current light theme. Business contact details and the original copyright/compliance copy are retained. Dead social placeholders are omitted. `SiteFooter` selects this footer only for `/`; interior and authentication route behavior remains unchanged.

The page continues to render on the server using `connection()`. Only testimonial navigation needs new client state. Styling uses the existing `--home-*` tokens, including the future dark palette. No theme toggle or active dark mode is added.

## Validation

Source snapshots, protected-file hashes, SSR HTML, browser screenshots, and Lighthouse output are saved under `output/landing/`. Checks cover the production build, scoped lint, unchanged hero/gallery/interior/legal sources, retained testimonial copy, server-rendered sections, functional testimonial navigation, enquiry prefilling, Buy navigation, mobile overflow, and light/dark styling. Generated property images and inventory remain illustrative, and testimonials require client confirmation before being treated as verified reviews.

The final production build and scoped lint passed. Browser checks covered 320, 390, and 768 pixel widths, desktop layout, keyboard testimonial navigation, all five quotes, and enquiry destinations. No horizontal overflow was found. A temporary static dark-theme snapshot verified the neutral surfaces and contrasting text, then was removed; the site remains in light mode. Mobile Lighthouse scored 92 performance, 100 accessibility, 96 best practices, and 100 SEO, with CLS 0, LCP 3.3 seconds, and TBT 80 ms. The best-practices console warning comes from the existing unauthenticated account request returning HTTP 401. The LCP target of 2.5 seconds was not reached in this throttled run; the preserved hero is eagerly loaded and correctly marked with high fetch priority.

Pre-flight review retains the explicitly approved hero and gallery, including their existing headline and hover behavior. New sections use four different layout families (photographic banner, asymmetric grid, editorial quote panel, and compact contact CTA), consistent radii and one accent. Image sizes are reserved, all new controls have labels and focus styles, no review ratings or aggregate trust statistics are invented, and the only new entrance animation communicates a manually selected testimonial change.

## Hero text entrance

The later hero animation request adds `HeroCopyEntrance`, a small GSAP React client wrapper around the existing server-rendered copy. On each mount or reload, the three headline lines fade and rise in sequence, followed by the description and contact link. The entrance finishes in about 1.2 seconds, uses only transforms and opacity, and clears its inline styles afterward. `gsap.matchMedia()` skips the animation for reduced-motion preferences and reverts it when that preference changes; `useGSAP()` scopes selectors and cleans up on unmount. No server-side styles hide the copy, so it remains readable before hydration or without JavaScript. Images, search, copy, and layout are unchanged.

Production build, scoped lint, and the local SSR content/visibility check passed for this change. Browser visual verification could not be completed because the browser security policy rejected opening the preview tab.

## Hero background slideshow

The subsequent slideshow request adds two existing illustrative Kolkata architecture images with similar skies and warm facades. `hero-slides.ts` holds the image records. `HeroSlideshow` handles image readiness and the 1.2-second opacity crossfade; `useHeroRotation` handles a 4.5-second rotation timer; `HeroSlideControls` supplies labelled image selectors and pause/play buttons. Hero copy, its one-time entrance, search, and the remaining landing sections retain their existing layout. Navigation mounts and full reloads begin with the first image.

The first photo and all hero copy remain visible in SSR HTML without JavaScript. The second photo is fetched at low priority two seconds after the first image loads; rotation and controls wait for both images. A failed photo stops autoplay and preserves the successful photo. Rotation pauses while hero content has focus, resumes when focus leaves the hero, and stops while the tab is hidden or less than 15% of the hero is visible. Hovering the photograph does not stop rotation. Manual image selection restarts the full 4.5-second hold, including selecting the already active image. Explicit Pause persists through focus changes and manual selection until Play is pressed. Reduced-motion preferences disable autoplay and use immediate manual image changes. Existing theme tokens style the controls; on mobile they sit below the photograph with reserved space to avoid layout shift. Landscape-cover image sizes account for the tall mobile crop, with quality 50 enabled alongside the existing quality 75 in Next's image allowlist.

Production build, TypeScript, scoped ESLint, and whitespace checks passed. Browser review verified desktop and 320/390-pixel phone layouts, both images, intermediate fade opacity, fixed copy geometry, automatic rotation, manual selection, and focus pausing. No horizontal overflow was found. Hero entrance is now also visually verified in the working browser preview. SSR checks confirmed one eagerly loaded high-priority hero photo and readable copy. Screenshots, SSR HTML, and audit reports are in `output/hero-slideshow/`. Reduced-motion and failed-image fallback behavior were reviewed in source; those preferences/failures were not forced in the browser.

Final throttled mobile Lighthouse scored 82 performance, 100 accessibility, 96 best practices, and 100 SEO, with LCP 4.9 seconds, CLS 0, and TBT 50 ms. Sharper portrait crops require more image data than the former single-image sizing. Compression and delayed second-image loading improved LCP from the first sharp-image trial's 8.7 seconds, but mobile performance remains below the earlier single-image run (92 performance / 3.3-second LCP). The remaining best-practices warning is the existing unauthenticated account request. Further mobile image delivery optimization is still warranted before treating this as a performance improvement.

### Rotation stopping fix

The later intermittent-rotation report exposed broad hover pausing and permanent pause state from focus/manual selection. Hover pausing is removed, temporary focus pausing is separate from explicit Pause, and every manual selection resets the timer without stopping autoplay. The viewport observer now checks its configured 15% threshold. Production build, TypeScript, and scoped ESLint passed. `node output/hero-slideshow/check-rotation.cjs` executes the real hook using deterministic state/effect and clock adapters, checking repeated cycles, focus resume, manual/same-image selection, explicit Pause/Play, readiness, reduced motion, tab visibility, intersection threshold, and cleanup. This isolated check does not exercise React DOM events or GSAP rendering. Browser verification of this fix was blocked by the existing preview tab's browser URL policy; no new screenshot or browser-performance claim is made for this change.

## Design gallery carousel

The subsequent gallery request expands the original four staggered cards to eight and adds a manual horizontal carousel. Server-rendered card content is passed into an isolated Embla client wrapper, with drag/swipe, trackpad gestures, arrow controls, keyboard navigation and a visible range counter. The original hover animation and theme tokens are retained. Implementation, SSR checks, mobile audit results and the outstanding live browser checks are documented in `docs/design-gallery.md`.

## Property management scroll expansion

`PropertyManagementReveal` is a small GSAP React wrapper around the existing server-rendered banner. ScrollTrigger scrubs the reveal from when the section reaches 90% of the viewport height to when it reaches 35%, with a 0.5-second catch-up. Its visible width starts at 84% on desktop/tablet and 96% on phones, then expands symmetrically to the original full width. The banner simultaneously rises from an 80px downward offset (32px on phones) to its original position. The trigger measures the stationary outer wrapper, so the moving banner does not change the scroll range. Scrolling back reverses both movements; no section is pinned.

A rounded `clip-path` reveals the photograph's edges rather than animating layout width or scaling the banner. Copy translates horizontally with the left edge, preserving font size, line wrapping, image proportions, the existing height and all content. Reduced-motion preferences and the no-JavaScript fallback retain the original full-size panel. `useGSAP()` and `matchMedia()` revert styles and the component's ScrollTrigger on unmount or preference/breakpoint changes. ScrollTrigger handles resize refreshes, and pending font loading triggers one guarded refresh.

Production build, scoped ESLint and SSR checks passed, with verification notes and SSR HTML recorded under `output/management-scroll/`. Lighthouse scored 100 accessibility and 96 best practices; the only console error was the existing unauthenticated account request returning HTTP 401, with no new GSAP runtime error reported. Live visual review remains pending because the preview browser is still displaying a connection-error document whose `data:` URL is blocked by the browser tool's URL policy. No visual rendering or scroll-performance claim is made for this change.

## Landing navigation underline

The landing header links now use the Buy page navigation's gold 2px underline, anchored 5px from the bottom and expanding from the left with a 180ms transform transition. Hover and keyboard focus reveal the line; text retains its normal color without hover brightening. Reduced-motion preferences disable the pseudo-element's transition. This CSS-only enhancement preserves the server-rendered navigation, link spacing and current theme tokens.

The same animation is applied to the landing footer's Find your place and Dream Key links, plus email and telephone links, through a reusable `animatedLink` CSS module class. Column links size to their text so the line does not stretch across the whole column. Existing legal-link styling and all destinations are retained. Keyboard focus reveals the underline and reduced-motion preferences remove its transition; there is no text brightening or glow.

## Management button directional fill

The “Discuss your property” CTA now uses the reusable `components/ui/DirectionalFillLink.tsx` and its CSS module. GSAP expands a circular gold fill from the cursor's entry point in 450ms and retracts it toward the exit point in 350ms. Interrupted hover continues from the current radius. A clipped, decorative copy of the label/icon gives contrasting text within the filled region, including with future-dark tokens. Geometry, copy and Contact destination are preserved. Only this CTA uses the new effect.

Keyboard focus/press gives solid fill, and reduced-motion hover skips animation. Readable server HTML and a CSS hover fallback remain available before hydration/without JavaScript. `useGSAP`, `contextSafe` and media cleanup scope and stop tweens. Production webpack build including TypeScript, scoped ESLint and SSR markup checks passed. Live hover rendering remains pending because the preview browser's connection-error document is blocked by its URL policy.

The accessibility/best-practices audit scored 100/96; the remaining console finding is the existing anonymous account HTTP 401. Formatting and diff whitespace checks passed. Local audit/SSR evidence is `/tmp/dreamkey-directional-fill-lighthouse.json` and `/tmp/dreamkey-directional-fill-home.html`.

## Shared footer text hover

The later consistency request moves the landing footer's gold 2px, 180ms left-growing underline into `components/layout/FooterTextLink.module.css`. HomeFooter, PageFooter, legacy Footer, AuthPageShell's footer and FooterMap's directions link now share it for hover and keyboard focus, without competing text-color changes or static hover underlines. Reduced motion removes the transition; compact account/legacy links position the line below text without increasing their height. Social icons retain their platform-color hover. Existing footer content, destinations and page-specific layouts are preserved.

Production webpack build including TypeScript, scoped ESLint and diff whitespace checks passed. Production HTML for all 12 routes confirms the shared class on every footer text link, excluding logos/social icons; evidence is `/tmp/dreamkey-footer-animation-ssr.json`. Live visual hover review remains pending under the existing browser limitation.

## Testimonial cards replacement

The later testimonial request replaces the grey two-column panel with a centered editorial heading and a horizontal card deck. `ClientStories.module.css` keeps its styles separate from the remaining landing sections, and `TestimonialCard.tsx` is a small presentational component. The selected white/semantic-surface card has a gold border; nearby cards sit slightly lower and remain selectable. Navigation moves cards with a 420ms transform transition, without autoplay or additional entrance motion. The grid reserves all cards' maximum content height to avoid shifting the next section; cards narrow responsively, and reduced motion disables transitions.

The original five quotes, names, roles and locations remain unchanged in `client-stories.ts`; only a reusable type is added. Initials avoid implying stock photographs are real clients. No rating or review date is invented. The confirmation-pending sample note remains visible below the controls. Native buttons provide previous/next wrapping and adjacent-card selection; the focused stage handles Left/Right/Home/End. Touch/pen horizontal swipe changes the selection while `touch-action: pan-y` preserves vertical scrolling. Canceled/vertical gestures leave the selection alone. Selecting a side card restores focus to the stage, and hidden far cards are inert. Only the active card's quote is exposed for reading, with a polite live selection announcement.

Isolated execution of the actual slider event handlers passed quote preservation, repeated navigation/wrap, keyboard, horizontal/vertical/canceled gestures, swipe click suppression, adjacent-card selection/focus and live announcement checks. This uses deterministic React/element adapters rather than a browser DOM; it cannot establish native pointer rendering or responsive visual appearance. Temporary check source: `/tmp/check-dreamkey-testimonials.cjs`.

Scoped ESLint, TypeScript and production webpack build passed. Server HTML confirms all five cards, one selected card, two inert far cards, labelled controls and the disclosure. Lighthouse scored accessibility 100 / best practices 96 with only the existing anonymous account HTTP 401 finding; the final mobile edge-spacing polish came afterward. Mobile cards now sit within a clipped full-width stage, with 20px neighboring-card slivers indicating continuation. This last spacing is source/build checked. SSR/audit evidence: `/tmp/dreamkey-testimonials-home.html`, `/tmp/dreamkey-testimonials-lighthouse.json`. Current interactive browser tooling was unavailable, so live responsive geometry, native gestures, reduced-motion rendering and future-dark visuals remain pending.

### Automatic testimonial navigation

The follow-up auto-scroll request adds `useTestimonialRotation.ts`, with a five-second hold and existing card transitions. Autoplay begins only when at least 25% of the carousel is visible. Mouse hover, keyboard-visible focus, touch/pen gestures, hidden tabs and reduced motion pause it, along with the new explicit Pause/Play button. Manual selection/navigation restarts the full hold, even for the current card, without undoing explicit Pause. Explicit Play can override keyboard pausing; pointer hover still pauses until leaving. Reduced motion disables autoplay and its playback button while retaining manual controls. The live region is off during automatic playback and polite during paused/manual browsing. Scoped timers, observer and preference/visibility subscriptions clean up on unmount.

The real hook passed isolated deterministic checks for five-second cycles/wrap, viewport gating, hover/focus/gesture pause and resume, same-card reset, explicit pause/play, reduced motion, tab visibility and timer cleanup. This is not a live browser interaction check. Temporary test: `/tmp/check-testimonial-rotation.cjs`.

Scoped ESLint, TypeScript, production webpack build and diff whitespace checks passed. SSR keeps five cards and labelled navigation/playback controls, with a conservative reduced-motion fallback before hydration; evidence is `/tmp/dreamkey-testimonials-autoplay.html`. Live visual and native focus/pointer verification remains pending under the existing tooling limitation.


### Shared dropdowns and testimonial control follow-up — 10 October 2026

The user requested removing the testimonial pause button and matching every selection menu to the theme. The testimonial explicit Pause/Play control and state are removed; five-second autoplay, hover/focus/gesture pauses, viewport/tab gating, reduced motion and manual navigation remain. This supersedes the explicit playback control described above; at that revision the hero slideshow controls were unchanged; the later hero follow-up below supersedes this.

Hero fields now consume `components/ui/Select.tsx` / `Select.module.css`, shared with Buy/Rent filters and sorting, enquiry fields and retained legacy selection controls. Radix Select supplies portalled, collision-aware menus and keyboard/focus behavior. Neutral token surfaces, 16px rounded panels, gold selected states and 140ms opening motion follow the existing theme; reduced motion skips transitions. The hero's outer field is a div rather than a label wrapping an interactive button; the select has its own accessible label. A visible native SSR/no-JavaScript fallback preserves the GET form's original names/options/empty values. After hydration it is visually hidden but remains the sole named control for submission. Account/mobile menus adopt matching surfaces and rows.

TypeScript, webpack production build, scoped ESLint for new/migrated controls and existing Buy verification pass. Legacy Navbar has the same two effect lint errors and unused-index warning as HEAD. Real React/Radix jsdom checks verify selection/FormData, controlled updates, hydration, portals, reset, Escape/focus; deterministic hook checks verify remaining autoplay behavior. Home, Buy, Rent and Contact Lighthouse accessibility 100 / best practices 96 with the existing anonymous 401 finding. Production SSR verifies five routes and the removed testimonial playback button. Live open-menu geometry, touch and dark visual checks remain pending; these tests are not visual browser review.


## Hero: four Kolkata views, selectors only — 10 October 2026

The latest user request removes the hero Pause/Play button and its explicit pause state. Four labelled dots retain manual selection. Two new illustrative photos join the original two: New Town-inspired towers beside a lake, and contemporary apartments above a Kolkata river/bridge skyline. Full built-in generation prompts, originals, WebP packaging and paths are in `docs/hero-additional-kolkata-images.md`. These scenes do not identify actual listings or addresses; no plants are added to roofs/balconies.

The first image remains the only initial SSR photograph. Three additional photos fetch at low priority two seconds after it loads; rotation/selectors wait until all four load. The existing successful-photo fallback on failure remains. The 4.5-second hold, 1.2-second opacity fade, manual timer reset, automatic focus/hidden-tab/offscreen pauses and reduced-motion behavior are preserved. This supersedes the two-image and explicit Pause descriptions above. Copy, search and other sections retain their layout.

Scoped ESLint, TypeScript, production webpack build and whitespace checks pass. The updated real-hook check verifies four-slide repeated cycles and automatic pauses/manual resets/cleanup; actual selector rendering confirms four labelled dots and no playback button. Production Home SSR and both original/optimized new image endpoints pass delivery checks. Generated assets were inspected; current live fade/crop/interaction review remains pending under the recorded browser limitation. Existing image-failure behavior was preserved, not newly fault-injected.


## Temporary Kolkata street hero experiment — 10 October 2026

A generated sunny boulevard, pastel apartment blocks and classic yellow taxi now open the hero rotation, followed by the four architectural images. The user may remove the experiment later; this is a reversible trial, not a permanent design decision. Remove the commented first record in `hero-slides.ts` to restore the architectural opening. The new local asset is `public/images/kolkata-street-experiment-v1.webp`; full generation and rooftop-plant cleanup prompts/provenance are in `docs/hero-street-experiment.md`. Five selectors fit the existing controls. The 4.5-second hold, 1.2-second fade and existing loading/reduced-motion/automatic pause behavior are retained.
