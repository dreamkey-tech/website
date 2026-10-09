# Login and registration redesign

The existing `/login` and `/register` routes now share a light account layout with an architectural photo on the left and the form on the right. The existing illustrative Kolkata high-rise asset is reused. Below 900px the photo is hidden and the form becomes the primary content. The account pages use a small brand header, return-home link, and support/legal footer instead of the full marketing navigation and footer.

`AuthPageShell` and `AuthFormFrame` provide the shared layout. `AuthForm` owns the login/registration interaction, `AuthField` handles accessible fields and password visibility, and `GoogleSignInButton` handles the existing Google OAuth endpoint with pending and error feedback. The original LoginForm and RegisterForm exports remain as small wrappers. No dependencies were added.

Both pages use Next's `connection()` for request-time server rendering. Local fonts and the existing semantic `--home-*` tokens match the other redesigned pages. Light mode remains active; both forms were checked in temporary static dark snapshots. Error colors are scoped semantic variables with dark equivalents. Form content is visible immediately, and hover/press transitions honor reduced motion.

## Authentication behavior

- Existing email/password and registration API endpoints, payload fields, session refresh, success messages, and `/buy` redirects are preserved. API/store/proxy modules and validation schemas are unchanged.
- Zod validation now uses `safeParse()` and `.issues`; the old `.errors` path was incompatible with the installed Zod version. Invalid submission stays local, shows inline errors, and focuses the first invalid field in visible form order.
- Name, email, and password order is preserved. Labels, autocomplete, required state, error associations, password show/hide, and disabled submission states are added.
- Google sign-in still calls `authApi.googleSignIn()` with its existing callback defaults. The leaf now displays connection failures instead of leaving them only in the console. No provider configuration was changed.
- The previous `Forgot password?` link pointed to `#`, and the project has no password-reset route/API. The redesigned page provides a working `Need help signing in?` link to Contact instead of presenting an unimplemented reset flow.

## Verification

Production webpack build and scoped ESLint passed. Both routes appear as server-rendered on demand. Initial server HTML contains the fields and headings. Browser checks covered desktop, 390px, and 320px layouts, empty-form validation, first-field focus, account-page switching, password visibility, and return-home navigation. No horizontal overflow was observed.

`node output/auth/verify-auth.cjs` checks real validation schemas with mocked authentication API/store/navigation responses. It covers successful login/registration payloads and redirects, invalid submissions, API errors, Google-only account errors, and Google redirect/failure feedback. Live account creation, credential sign-in, and provider consent were not exercised.

Final mobile Lighthouse:

| Page | Performance | Accessibility | Best practices | SEO | CLS | Simulated LCP |
| --- | --- | --- | --- | --- | --- | --- |
| Login | 96 | 100 | 96 | 100 | 0 | 2.73s |
| Register | 95 | 100 | 96 | 100 | 0 | 2.87s |

The best-practices deduction comes from the existing anonymous session check returning HTTP 401. No authentication/session behavior was changed to silence it. Simulated LCP remains above the 2.5s target.

All 24 landing baseline file hashes remain unchanged, and the browser still renders the original `.home-header` on `/`. Privacy and Terms legal copy remains unchanged. Temporary public dark-preview files were removed. Screenshots, original form snapshots, interaction checks, and audits are saved in `output/auth/`.
