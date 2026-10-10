# Privacy and Terms page redesign

The existing `/privacy` and `/terms-and-conditions` routes now use the same light page shell, local fonts, restrained gold accents, and semantic theme variables as Sell, Rent, About, and Contact. The landing page retains its existing shell and content.

`components/pages/LegalDocument.tsx` provides the shared server-rendered document layout, legal-page navigation, sticky desktop contents, native mobile disclosure, and back-to-top link. Legal prose remains in each route. Both routes use Next's `connection()` for request-time server rendering. No new client component or dependency was added.

All original legal paragraphs, numbered headings, list items, contact links, and update dates were preserved. The rendered originals and redesigned bodies were compared after JSX transpilation and HTML entity decoding: 56 Privacy items and 81 Terms items matched. The obsolete Material Symbols placeholders were removed from the Terms contact block. Privacy retains `contact@dreamkeykol.com`; Terms retains `info@dreamkeykol.com`.

## Verification

- Production webpack build and scoped ESLint passed. Both routes appear as dynamic server-rendered routes in the build output.
- All 24 landing baseline file hashes in `output/pages/landing-baseline.json` remained unchanged.
- Browser checks covered desktop and 390px/320px phone layouts, native contents disclosure, section anchors, back-to-top, and legal-page switching. No horizontal overflow was observed.
- A temporary static copy of the server-rendered document verified the existing dark tokens: page `#1a1a1a`, headings `#f5f5f5`, body `#b5b5b5`. The temporary public preview file was removed. Light mode remains active.
- Mobile Lighthouse: Privacy 92 performance / 100 accessibility / 96 best practices / 100 SEO; Terms 94 / 100 / 96 / 100. Both have CLS 0. Simulated LCP was 2.74s and 3.01s respectively. The existing anonymous `/api-proxy/v1/user/auth/me` HTTP 401 accounts for the best-practices deduction.

Screenshots, original copy snapshots, rendered comparisons, and audit results are saved in `output/legal/`.
