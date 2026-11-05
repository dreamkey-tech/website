# Rent catalogue consistency

Historical layout-only checkpoint: live Rent API integration now supersedes this implementation. See `docs/rental-properties-api.md` and `output/rent-api/` for current code and checks. The former local-state handler adapter here is retained as historical evidence and no longer targets the active server catalogue.

4 November 2026. Local production preview of the current working tree; no push or production frontend test.

Rent now shares Buy's search, sidebar, toolbar, card and responsive CSS. The sidebar offers the existing supported rental fields: neighbourhood, monthly cap, exact bedrooms and furnishing. Top and sidebar controls share a draft; Find homes or Apply filters applies it. Active chips, Clear all, monthly-rent sorting and grid/list views work on the same four illustrative records. Inventory, images, Contact-prefill destinations and sample disclosure are preserved.

Source changes for this follow-up:

- `components/pages/RentalBrowser.tsx`: shared catalogue layout, synchronized controls, chips and view toggle.
- `components/pages/RentalFilters.tsx`: desktop sidebar and mobile disclosure, monthly slider and rental guidance.
- `components/pages/rental-data.ts`: existing supported choices centralized for both forms; data/filter algorithm unchanged.
- `components/pages/RentalCard.tsx`: Buy card structure, shared list view, responsive image hints and monthly price label.
- `components/buy/Buy.module.css`: active-filter styles also support real buttons used by client-side Rent; Buy anchor chips remain supported.

## Verification

- Production `npm run build -- --webpack`, including TypeScript, passes.
- Scoped ESLint for the four changed/new rental TypeScript files and `git diff --check` pass.
- `check-search.cjs` copies the existing isolated search/analytics checks, adapting the reset lookup to the new sidebar prop. All six checks pass; no GA or CRM requests are sent. Results: `search-verification.json`.
- `browser-checks.json` records actual local Chromium interactions: draft selection sync without premature application; New Town and Furnished combined results; impossible combination/empty state; reset; keyboard ₹30,000/₹50,000 slider caps; chip removal; ascending rent sort; list view; mobile expansion/application/collapse with count. No horizontal overflow at 1920, 1440, 768, 390 or 320px.
- `desktop.png` shows the default sidebar/grid; `list-desktop.png` shows the sorted list view; `mobile.png` shows the collapsed mobile controls. Cookie choices were rejected locally for these screenshots.

Only local frontend behavior and isolated handlers were verified. No production tests, live account/lead mutation or rental API integration are included. Existing sitewide sizing changes were preserved.
