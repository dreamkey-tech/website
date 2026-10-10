<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## DreamKey project rules

- Read `PROJECT_CONTEXT.md` and `CURRENT_PROGRESS.md` before feature work. They distinguish current code, user decisions, historical verification, and unknowns. Check the code when older `docs/` notes describe a superseded implementation.
- Preserve existing work in the dirty tree. Keep changes within the user's current scope; do not reset unrelated files, delete retained legacy components, or commit/push without authorization.
- Use strict TypeScript, the `@/` root alias, small reusable components, existing CSS modules/native CSS, and the installed Phosphor icons. Reuse existing dependencies before adding a library.
- Keep redesigned route pages as Server Components with request-time rendering where currently implemented. Isolate browser state, event handlers, carousels, and animation in small client components; preserve meaningful initial server HTML.
- Light mode is active. Use the semantic `--home-*` tokens in `app/hero.css` for redesigned UI and preserve their future-dark overrides. Do not add a theme toggle unless requested.
- Preserve the approved editorial design, exact hero tagline, neutral text, and gold `#df9e04` accent. Keep motion restrained, support keyboard/touch and reduced motion, and clean up GSAP contexts, timers, observers, and listeners.
- Use local fonts and responsive `next/image` with reserved image dimensions. Generated architecture is illustrative; avoid vegetation on balconies/roofs in newly generated building imagery. Keep real client portraits/office photos photographic.
- Preserve Privacy/Terms prose, dates, and contact links during visual changes. Do not invent inventory, reviews, statistics, legal/compliance guarantees, or founder/service claims; retain sample-content disclosures.
- Preserve authentication cookies, API payloads, enquiry normalization, and existing redirects unless explicitly changing that behavior. Keep secrets and `.env` values out of code, docs, logs, and commits.
- Validate proportionately: scoped ESLint and TypeScript for code changes, `npm run build -- --webpack` for production verification, and relevant interaction checks. Distinguish source/SSR checks from live browser or backend verification. Documentation-only changes need document/diff checks, not an application rebuild.
- Keep these rules concise. Record detailed architecture/preferences in `PROJECT_CONTEXT.md` and current work, verification limits, and follow-ups in `CURRENT_PROGRESS.md` when they change.
