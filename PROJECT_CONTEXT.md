# DreamKey project context

Reviewed: 10 October 2026. This is a handoff for future Codex conversations, not a deployment or client sign-off record. Read `AGENTS.md` for coding rules and `CURRENT_PROGRESS.md` for outstanding work.

## Evidence and maintenance

- **Verified**: inspected in the current repository during this documentation task. A fact about website copy establishes what the website says, not independent proof of the business claim.
- **Conversation**: a decision or preference stated by the user in the available conversation. Earlier assistant replies are not fully recoverable; do not reconstruct missing agreements.
- **Recorded**: described in existing `docs/` or `output/` evidence, or in the preceding implementation turn. Historical checks are not fresh checks of every subsequent revision.
- **Unknown**: missing, unconfirmed, or not exercised. Resolve through code, source material, or the user when needed.

Existing `docs/` files are implementation history. For example, `docs/hero-design.md` says the Buy page does not consume search preferences, but the current Buy implementation does. Older statements that the lower landing sections remain dark or that Services uses the legacy shell have also been superseded. Preserve historical notes; use current code and these handoff files for present status.

## Product and client

**Conversation:** A real estate website for a client in Kolkata, West Bengal, redesigned progressively from the hero downwards. Users should be able to explore buying/renting options, discuss selling a property, learn about the team/services, and submit enquiries.

**Verified:** The current brand text is **Dream Key Reality**, with some catalog names using **DreamKey**. The supplied logo is rendered through `components/layout/BrandLogo.tsx` using `public/logo.webp`; `public/logo2.png` is the root favicon. Whether the legal/company spelling should instead be "Realty" is **unknown**; do not silently normalize it.

Contact details currently rendered in Contact and shared footers:

- Phone: `+91 86975 59123`; telephone destination `tel:+918697559123`.
- General email: `info@dreamkeykol.com`.
- Address: `AA 52, st-69, AA block, Newtown, Kolkata, West Bengal 700156`.
- Privacy intentionally retains its existing `contact@dreamkeykol.com` link; Terms uses `info@dreamkeykol.com`.

These are verified repository values. Independent confirmation of company registration, office address, compliance, and all marketing claims is outside this handoff.

**Conversation + verified, office-map follow-up:** The user supplied a precise Google Maps embed for DreamKey and explicitly asked to keep the written address. `lib/office-location.ts` stores that exact embed and a Google Maps destination using the business CID from it. Both Contact directions links and all footer map links share that destination. `components/maps/OfficeMap.tsx` supplies the lazy iframe, title, fullscreen support, and `strict-origin-when-cross-origin` referrer policy. `components/layout/FooterMap.tsx` / `.module.css` place a responsive, 190px-high rounded map under location details in the home/interior footers and in the legacy footer's brand/contact column. Contact retains its larger on-demand map via `ContactMap`, using the same iframe. Marketing footers render the compact map directly; account pages retain their standalone shell. Google's embedded UI controls its own map colors; surrounding styles use existing theme tokens.

## Architecture and technologies — verified

Next.js App Router in root `app/`, React, strict TypeScript, Tailwind v4, and feature-oriented `components/` folders. `tsconfig.json` maps `@/*` to the repository root. `package-lock.json` is present; use npm.

Installed versions at review time:

| Technology                     | Version                 | Role                                                                     |
| ------------------------------ | ----------------------- | ------------------------------------------------------------------------ |
| Next.js                        | 16.3.8                  | App Router, request rendering, image/font optimization, loading boundary |
| React / React DOM              | 19.2.8                  | Server/client component composition                                      |
| TypeScript                     | 5.9.3                   | Strict typing                                                            |
| Tailwind CSS                   | 4.3.3                   | Existing global/legacy utility styling                                   |
| GSAP / `@gsap/react`           | 3.15.0 / 2.1.2          | Hero entrances/crossfade and scroll reveal                               |
| Embla React / autoplay package | 8.6.0 / 8.6.0           | Gallery carousel; current gallery does not autoplay                      |
| Phosphor React                 | 2.1.10                  | Existing icon family; SSR imports on server components                   |
| Motion                         | 14.0.0                  | Retained legacy animations, including Careers                            |
| Axios / Zustand / Zod          | 1.20.0 / 5.0.15 / 4.6.5 | API adapters, auth state, validation                                     |
| Sonner                         | 2.0.8                   | Root toast notifications                                                 |

`sooner` 1.1.4 is also installed; its intended role is unknown. No component library is required for the redesign: current work primarily uses CSS modules, native controls, and Phosphor.

### Routing and shell

`app/layout.tsx` loads local fonts, explicitly sets `<html data-theme="light">`, mounts `AuthProvider`, and supplies server-rendered header/footer variants to small pathname-aware client selectors:

| Route(s)                                                                                         | Current rendering/shell                                                                                |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `/`                                                                                              | Async server page awaiting `connection()`; `HomeNavbar` and `HomeFooter`                               |
| `/buy`, `/rent`, `/sell`, `/about`, `/contact`, `/services`, `/privacy`, `/terms-and-conditions` | Async server pages awaiting `connection()`; shared `PageHeader` and `PageFooter`                       |
| `/login`, `/register`                                                                            | Async server pages awaiting `connection()`; standalone `AuthPageShell`, marketing header/footer hidden |
| `/careers`                                                                                       | Existing client page, statically prerendered in the last recorded build; legacy navbar/footer          |
| `/dashboard`                                                                                     | Removed; no route file or account-menu destination remains                                             |

Selectors: `components/layout/SiteHeader.tsx`, `SiteFooter.tsx`, and `components/pages/page-routes.ts`. `MobileBottomNav` returns null on Home and redesigned routes; it remains for legacy routes. Existing global dark utility styles coexist with the redesigned light surfaces; the whole application is not uniformly converted to the new theme system.

`app/loading.tsx` renders `components/navigation/PageLoading.tsx`. This is Next's native route loading boundary, not the supplied CRM's global click listener/router context. Feedback has a delayed brand reveal and gold dots. It does not speed compilation, intercept navigation, or guarantee a loader for every refresh/API call. See `docs/navigation-loading.md`.

### API, forms, and authentication

- `api/client.ts`: Axios base `/api-proxy`, credentials enabled. Anonymous 401 responses are rejected to callers, without forcing public visitors to Login.
- `next.config.ts`: backend rewrites use server-only `API_URL`; `/api/auth/*` preserves the backend `/api/auth/*` prefix, generic `/api/*` and `/api-proxy/*` strip their respective frontend prefixes. Backend implementation is outside this repo. Do not change prefix behavior casually.
- `api/auth.ts`: email/password login, registration, `me`, refresh, logout, and Better Auth Google session/social endpoints. `NEXT_PUBLIC_APP_URL` is a server fallback for OAuth callback origin; browser origin is used in the browser.
- `store/authStore.ts` and `components/providers/AuthProvider.tsx`: check OAuth session first, then email/password session; keep public pages available to anonymous visitors. Successful email/password form submission refreshes the user and navigates to `/buy`. Google sign-in defaults to `/`.
- `proxy.ts`: cookie-presence routing for `/profile` and `/settings`, and redirect authenticated visitors away from Login/Register to `/`. Those protected page implementations are absent. Cookie presence here is not backend session validation.
- `zod/auth.ts`: email, minimum six-character password, registration name minimum two characters. `AuthForm` uses Zod v4 `safeParse()` / `.issues` and focuses the first invalid field.
- `api/enquiry.ts`: posts to `/v1/website/enquiry` via the shared client. `PropertyEnquiryForm`, `EnquiryContactFields`, `SellerPropertyFields`, `enquiry-values.ts`, and `zod/enquiry.ts` own form UI/schema/normalization. Indian mobile numbers normalize to `+91 1234567890`; enquiry purpose is included in `specificRequirements`.
- Contact accepts `purpose` and `property` query values to prefill the form. Visiting a listing or enquiry link does not submit an enquiry. `ContactMap` loads the embedded map on request.

Live backend delivery and authentication/provider success are **unknown** for the latest frontend state. Earlier mocked checks are recorded, not proof of production delivery.

## Confirmed design preferences

**Conversation:** Keep the reference's clean, photographic editorial style: generous whitespace, rounded photographs, sans-serif headlines with italic serif emphasis, restrained accents, and small reusable components. Keep light mode now, prepare semantic colors for future dark mode. Pages should render on the server. The user accepts creative choices without design files and expects iterative review.

Brand palette supplied by the user:

| Purpose   | Preference                                    | Current implementation                              |
| --------- | --------------------------------------------- | --------------------------------------------------- |
| Primary   | `#df9e04`                                     | Main actions, active states, gold underline accents |
| Secondary | `#1a1a1a` or `#2a2a2a`                        | Neutral supporting elements                         |
| Tertiary  | `#6b6b6b`                                     | Muted text/supporting gray                          |
| Neutral   | Charcoal/gray for surfaces, borders, and text | Semantic light/dark palettes                        |

**Verified:** `app/hero.css` defines `--home-page`, `--home-surface`, `--home-text`, `--home-text-muted`, border/focus/photo/accent tokens and `[data-theme="dark"]` overrides. Light page is `#fafafa`, main text `#1a1a1a`, muted text `#6b6b6b`; future dark uses charcoal surfaces and lighter neutral text. There is no theme toggle or system-theme selection. Use contrast-aware dark text on gold actions rather than assuming white text.

Fonts are local WOFF2 via `next/font/local` in `app/layout.tsx`: Plus Jakarta Sans (body), Space Grotesk (display where used), and Playfair Display italic (editorial emphasis). Assets, original TTFs, and license files are in `public/fonts/`. The scaffold README's Geist statement is stale.

**Conversation:** Logo on the left, navigation/account controls on the right. Hero wording must remain **"Homes That Match Your Pace, Not Just Your Budget."** Architecture should feel like Kolkata; avoid plants/planters on buildings, balconies, and roofs. Ground landscaping is acceptable. This imagery preference does not require removing plants from real office photographs.

**Conversation:** Motion should feel considered; the user explicitly deferred both expanding-on-hover and animated bento alternatives for Best properties. Do not treat either as approved. Gold nav/footer text underlines are wanted without white glow. Social icons are an exception: neutral normally, platform colors on hover, no circle border or underline.

**Conversation + verified, footer consistency:** Footer text links share `components/layout/FooterTextLink.module.css` across HomeFooter, PageFooter, legacy Footer and AuthPageShell, including FooterMap directions links. Its 2px gold underline grows from the left over 180ms on hover/keyboard focus, with reduced-motion transitions disabled. Text does not brighten or change color. Compact unpadded account/legacy links adjust underline placement without adding layout height. Social icons retain their separate platform-color treatment; footer copy/destinations and layouts remain distinct.

The earlier instruction to leave the landing page untouched was scoped to interior-page work; the user subsequently authorized landing changes. It is not a permanent prohibition. Future work should follow the latest scope.

## Important components and current behavior — verified

### Landing page

`app/page.tsx` renders this order: `HeroSection` → `DesignGallery` → `PropertyManagement` → `BestProperties` → `ClientStories` → `HomeContactCTA`. `HomeFooter` comes from the root shell. The reference's About Us/statistics block is omitted; older dark landing sections remain as source files but are not mounted here.

| Feature            | Files / behavior                                                                                                                                                                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero copy/search   | `components/home/HeroSection.tsx`, `HeroCopy.tsx`, `HeroPropertySearch.tsx`, `HeroSearchField.tsx`; native GET to `/buy` with `location`, `budget`, `bedrooms`, `type`                                                                                      |
| Hero text entrance | `HeroCopyEntrance.tsx`; small GSAP client wrapper around server copy; roughly 1.2-second staged rise/fade; reduced-motion skip and cleanup; no CSS-hidden initial copy                                                                                      |
| Hero slideshow     | `hero-slides.ts`, `HeroSlideshow.tsx`, `useHeroRotation.ts`, `HeroSlideControls.tsx`, `HeroSlideshow.module.css`; two illustrative photos, 4.5-second hold, 1.2-second crossfade                                                                            |
| Design carousel    | `DesignGallery.tsx`, `DesignGalleryCard.tsx`, `design-gallery-data.ts`, `DesignGalleryCarousel.tsx`, `DesignGallery.module.css`; eight staggered cards linking to `/buy`; manual Embla movement, arrows, counter, partial next card, conditional edge fades |
| Management banner  | `PropertyManagement.tsx`, `PropertyManagementReveal.tsx`, `Landing.module.css`; Contact CTA, generated office image, rise and symmetric scroll expansion                                                                                                    |
| Featured homes     | `BestProperties.tsx`, `HomePropertyCard.tsx`; Buy catalog IDs `2, 8, 1`, one larger photograph, Contact-prefill links and View all to Buy                                                                                                                   |
| Testimonials       | `ClientStories.tsx`, `TestimonialSlider.tsx`, `client-stories.ts`; five retained sample quotes, initials, manual controls, polite announcements, no autoplay                                                                                                |
| Enquiry CTA        | `HomeContactCTA.tsx`; Contact and phone links replace the former simulated landing form; actual forms remain on Contact/Sell                                                                                                                                |

Hero rotation waits for both images, delays the second fetch two seconds after the first loads, and preserves a successful photo on failure. It pauses for explicit Pause, focus in hero content, hidden tabs, reduced motion, and visibility below 15%. Photo hover does not pause. Manual selection restarts the full hold, including the current image; explicit Pause persists until Play.

The carousel preserves vertical scrolling and supports drag/swipe, horizontal or Shift-wheel gestures, Left/Right and Home/End on the focusable viewport. It has a native horizontal scroll-snap fallback. Fine-pointer hover/focus reveals card text first, then the arrow after 140ms; the arrow starts pointing right and turns to the upper-right over 480ms. Touch keeps the overlay visible; reduced motion removes movement.

Management reveal uses ScrollTrigger from section top at 90% to 35% of viewport height, scrub `0.5`, without pinning. It starts visually at 84% width and 80px below on desktop, 96% and 32px below on mobile, then reaches the original position/size. Rounded clipping reveals the image without scaling type or changing layout width. No JavaScript/reduced motion leaves the original full panel.

The management Contact CTA uses `components/ui/DirectionalFillLink.tsx` / `.module.css`: a reusable small client link with a GSAP circular gold fill from pointer entry, retreating toward pointer exit (450ms/350ms). Clipped decorative duplicate content preserves text contrast across light/future-dark colors without changing button geometry. Keyboard focus/press and reduced-motion hover use a solid fill; no-JavaScript content stays readable. Scoped event tweens and media cleanup handle interruptions/unmounts. This effect is currently applied only to “Discuss your property,” as requested.

Landing anchors include `home-content`, `designer-apartments`, `property-management`, `properties`, `testimonials`, `contact`, and `contact-form`.

### Interior, account, and shared footer

- **Buy:** `app/buy/page.tsx`, `components/buy/buy-data.ts`, `BuySearch`, `BuyFilters`, `BuyBudget`, `BuyCard`, `BuyResults`, `BuyPagination`, `Buy.module.css`. Eight illustrative records; six per page. URL-based server filtering, sorting, chips, reset, and pagination remain active. Location matches any selection; amenities match all. Hero search values are accepted. Grid/list, mobile filter expansion, price cap, and sort use small client controls.
- **Rent:** `app/rent/page.tsx`, `components/pages/RentalBrowser.tsx`, `RentalCard.tsx`, `rental-data.ts`. Four illustrative records; local client filters for neighbourhood, budget, bedrooms, and furnishing, plus sort/reset/count/empty states. Despite an earlier conversation remark about removed filters, current filters are present.
- **Buy/Rent intros:** both large text/photo introductions are commented out with restoration instructions. Hidden H1s remain. Their CSS and image imports/comments are retained intentionally.
- **Sell/Contact:** `app/sell/page.tsx`, `app/contact/page.tsx`; shared real API-backed enquiry UI, photo/CTA components, native FAQs on Sell, on-demand map on Contact. No property detail route exists; catalog enquiries lead to Contact.
- **About:** `app/about/page.tsx` contains Sayan Dutta (Founder), Mainak Maji (Co-Founder), Siddhant Singh (Co-Founder). Sayan/Siddhant use supplied replacement portraits; Mainak remains unchanged. `components/about/OfficeGallery.tsx` and `AboutPhotos.module.css` show the real office. The biographies are current website copy, not newly verified interview statements.
- **Services:** `app/services/page.tsx` and `components/services/` (`ServicesHero`, `ServicesCollection`, `ServiceCard`, `ServicesNetwork`, `ServicesApproach`, `services-content.ts`, `Services.module.css`). Four cards cover buying, renting, selling, and combined investment/real estate consulting; partner network, approach, native FAQs, enquiry CTA. See source-grounding notes below.
- **Legal:** `app/privacy/page.tsx`, `app/terms-and-conditions/page.tsx`, shared `LegalDocument.tsx` / `.module.css`. Sticky desktop contents, native mobile disclosure, anchors/back-to-top. Existing copy and dates retained: Privacy October 1, 2026; Terms October 4, 2026.
- **Accounts:** `AuthPageShell`, `AuthFormFrame`, `AuthForm`, `AuthField`, `GoogleSignInButton`, `Auth.module.css`; Login/Register wrapper exports retained. Left high-rise photo and right form; photo hidden below 900px. `100dvh` shell, top-aligned shared tabs, reserved three-row field area to stabilize action heights, narrow-panel heading reservations. Form panel alone can scroll for constrained height/zoom/keyboard/errors. No password reset route/API; the help link goes to Contact.
- **Footers:** `HomeFooter`, `components/pages/PageFooter.tsx`, legacy `Footer` share `FooterSocialLinks.tsx` / `.module.css`. Landing text links have the 180ms gold underline without glow. Social SVGs have invisible 44px hit areas, no persistent circles/underline, neutral default and brand-color hover/focus; Instagram uses SVG gradient, YouTube red, Facebook/LinkedIn blue. Legacy footer also retains green WhatsApp. New-tab links have labels and `noopener noreferrer`.

Social destinations supplied by the user and present in the shared component:

- Instagram: https://www.instagram.com/dream_key_kolkata/
- YouTube: https://www.youtube.com/@dream_key_kolkata
- Facebook: https://www.facebook.com/profile.php?id=61594174244288&utm_source=ig&utm_medium=social&utm_content=link_in_bio
- LinkedIn: https://www.linkedin.com/company/dreamkeykol-reality/home/
- Existing legacy WhatsApp: https://api.whatsapp.com/send?phone=918697559123

## Content and image provenance

**Verified:** Catalogs and testimonials are explicitly marked illustrative/sample in code/UI. There is no property inventory API adapter in this repository. Do not infer real development inventory, prices, actual customer reviews, or Urbana affiliation from the images and names.

**Conversation + recorded:** Services was rewritten using `/home/koushik/Downloads/Dreamkey_Founder_Interview_Answers.pdf`. The file still exists locally; this handoff did not re-extract its text. `docs/services-page.md` describes a 17-page founder-perspective draft and maps content to source sections. It retains buying/renting/selling/consulting and collaboration with brokers/consultants, with selected East/South/North Kolkata coverage. Operational details require confirmation. Do not extrapolate full property management, formal valuation, legal/title verification, guaranteed returns, exact response times, post-deal support, commercial/land inventory, or developer partnerships from that source. The existing management banner and inherited claims elsewhere have not all been reconciled with it.

Generated WebP assets:

- `public/images/kolkata-urbana-inspired-hero.webp`: generated Urbana-inspired illustration, not an actual project photograph. Historical notes reference Urbana's official gallery for architectural inspiration. The saved final prompt is **unknown**: `docs/urbana-hero-image-prompt.md` contains `undefined` under "Exact prompt".
- `public/images/kolkata-residence-hero-v2.webp`: alternative clean-balcony building; prompt saved in `docs/hero-image-v2-prompt.md`. Earlier `kolkata-residence-hero.webp` retained.
- `public/images/design-gallery/*.webp`: four generated villa/interior photographs, prompts in `docs/design-gallery.md`.
- `public/images/pages/{sell-residence,rent-living,about-studio,contact-kolkata}.webp`: illustrative page imagery; prompts in `docs/interior-page-images.md`. `about-studio.webp` remains on Management/Services, not the current About hero.

Client-supplied photos remain available outside Git at `/home/koushik/Downloads/dreamkey-iamges/iamges` (the spelling is intentional). Verified source filenames and website mapping:

| Original        | Current public asset                    | Use               |
| --------------- | --------------------------------------- | ----------------- |
| `Sayan.HEIC`    | `public/about/sayan-portrait.webp`      | Sayan portrait    |
| `Siddhant.HEIC` | `public/about/siddhant-portrait.webp`   | Siddhant portrait |
| `office2.HEIC`  | `public/about/office-meeting-room.webp` | About hero        |
| `office1.HEIC`  | `public/about/office-workspace.webp`    | Office gallery    |
| `office3.HEIC`  | `public/about/office-exterior.webp`     | Office gallery    |

Conversion/orientation/sRGB handling and omission of public EXIF/XMP are **recorded** in `docs/interior-page-images.md`; not re-audited here. Original HEIC files, old portraits, and `public/about/mainak.webp` remain. External source paths are machine-specific and will not accompany a clone; preserve originals separately if needed.

## Working environment and reference index

**Verified:** Current branch `redesign`, remote `origin` at `https://github.com/dreamkey-tech/website.git`, many pre-existing modified/deleted/untracked files. The removed dashboard is a tracked deletion. Check Git status before acting.

**Recorded:** GitHub CLI previously authenticated with repository push permission. Re-check credentials/permission when needed; terminal access alone does not guarantee GitHub access. No commit/push is part of this documentation task. A production preview was last started at port 3002; do not assume the session survives a future conversation.

Run commands from the repo root:

```sh
npm run dev -- --port 3002
npm run build -- --webpack
npm run start -- --port 3002
./node_modules/.bin/tsc --noEmit
./node_modules/.bin/eslint <changed-files>
```

Build script remains plain `next build`; Webpack was the verified workaround for an execution-environment Turbopack worker port-binding limitation. It is not evidence of a universal Turbopack defect. No automated `test` script or CI/release workflow has been established in this handoff. Ad hoc checks and artifacts under `output/` have different revision scopes.

Detailed references: `docs/hero-design.md`, `docs/hero-image-v2-prompt.md`, `docs/urbana-hero-image-prompt.md`, `docs/design-gallery.md`, `docs/landing-page.md`, `docs/interior-pages.md`, `docs/buy-page.md`, `docs/legal-pages.md`, `docs/account-pages.md`, `docs/navigation-loading.md`, `docs/services-page.md`, `docs/interior-page-images.md`. Use `CURRENT_PROGRESS.md` to identify which verifications remain relevant.
