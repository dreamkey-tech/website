# Sitewide desktop sizing verification

4 November 2026. Local production build from the current uncommitted working tree. This supersedes the earlier Buy-only evidence in `output/desktop-layout-2026-11/`.

## Change

The same responsive rem scale now applies to Home, Buy, Rent, Sell, Services, About, Contact, account/recovery screens, public and gated property screens, legal pages, Careers, shared navigation/footers, consent UI and loading screens. Below 1480px the default root size remains 16px. Above that width it grows to 20.8px at 1920px and caps there. Standard content is 83rem: 1328px at 1440px and approximately 1726px at 1920px. Existing narrower legal and separate Home/account frames retain their proportions.

No browser zoom or transform scaling is used. Hairlines and breakpoint thresholds remain in pixels. Responsive image delivery hints and icon dimensions follow the expanded layout. Hero assets, inventory, copy and API/auth/analytics behavior are preserved.

## Browser evidence

All browser evidence uses the local Chromium in-app browser, not a production or native Chrome/Firefox comparison.

- Every public route was checked at 1920×900 and 390×844 with no horizontal overflow. Buy also passed at 320, 768, 1440, 1536 and 2048px widths. Measurements are in `browser-checks.json`.
- Login and Register fit at 1920×900 and 1280×720 with the consent banner. Register also fits at 1920×800: form panel client/scroll height both 573px. See `account-fit-checks.json`.
- The final Home search ends at x1622.8px, clear of the fixed enquiry link starting at x1695.1px at 1920×900. It remains inside the hero.
- The shared listing loader was measured during navigation: logo frame approximately 208×83px and brand text 28.6px at 1920px. There is no dedicated loader screenshot in this folder.
- Protected property detail/gallery checks used the existing loopback fixture and a synthetic local session. The desktop gallery dialog fits the viewport without internal overflow; mobile detail fits at 390px. No real interest POST was submitted.
- Unknown routes now use the editorial 404 shell with readable dark navigation and `noindex`; checked on desktop and mobile.

Screenshots:

| Files | View |
| --- | --- |
| `home-desktop.png` | Final wide Home hero/search and fixed enquiry action |
| `about-desktop.png`, `services-desktop.png`, `sell-desktop.png`, `rent-desktop.png`, `contact-desktop.png` | Main interior routes |
| `privacy-desktop.png`, `terms-and-conditions-desktop.png`, `careers-desktop.png`, `not-found-desktop.png` | Legal, legacy Careers and 404 layouts |
| `register-desktop-banner.png`, `register-short-desktop-banner.png` | Signup with consent banner at 900px and 800px desktop height |
| `buy-desktop-fixture.png`, `property-desktop-fixture.png`, `property-mobile-fixture.png`, `property-viewer-desktop.png` | Synthetic property catalogue/details/gallery |

## Checks and limits

- `npm run build -- --webpack` passes, including TypeScript.
- `git diff --check` passes.
- Scoped changed-source ESLint has no new errors. Two existing `react-hooks/set-state-in-effect` errors in the legacy Navbar and four existing unused-variable warnings were confirmed against HEAD; full lint is not reported as clean.
- Ten existing mock-backed property HTTP/SSR regression checks pass; details in `property-http-verification.json`. These cover filters, cookie gates, sanitization, no SSR/prefetch interest, errors, missing listings and safe redirects.
- No real signup, password change, lead submission or authenticated customer-interest mutation was performed. No production frontend test, commit, push or deployment was performed for this task.
