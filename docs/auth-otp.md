# Email verification and password recovery

Implemented 1 November 2026. This documents frontend integration, not live account/email delivery or a deployment.

**Buy follow-up:** Auth forms now also work in the property login popup, with an optional same-origin return destination through login/signup/recovery/Google. Default account destinations are preserved. See [website-properties-api.md](website-properties-api.md). The default account-page observations below predate that addition.

## Sources and decisions

The user requested the Website User Auth APIs from [Swagger](https://backend.dreamkey-crm.workers.dev/docs). The referenced HTML and `/openapi.json` were fetched read-only. Installed Next server/client and CLI guides were consulted, with current Axios/React documentation from Context7 for cancellation, typed errors and component testing. No backend source is available in this repository.

The user explicitly answered **Require email OTP after signup**. No standalone signup-verification endpoint is documented; signup therefore uses the public `resend-otp` and `verify-login-otp` endpoints with `LOGIN` purpose. Google sign-in retains its existing Better Auth flow.

## Documented Website User Auth contract

All paths below are under `/v1/user/auth/`. Existing Axios requests use `/api-proxy` with credentials enabled. Backend rewrites and cookie handling were preserved.

| Endpoint | Request | Documented success / role |
| --- | --- | --- |
| `register` POST | `name`, `email`, `password` | 201 `{user}`; creates account and immediately issues HttpOnly access token. Backend name is optional; existing frontend name requirement is retained. |
| `login` POST | `email`, `password` | 200 `{success: true, requiresOtp: true, message, email}`; sends four-digit email OTP, not completed login. |
| `verify-login-otp` POST | `email`, `otp` | 200 `{success: true, message, user}` with `emailVerified: true`; verifies email and issues session cookies. |
| `resend-otp` POST | `email`, `purpose: LOGIN \| PASSWORD_RESET` | 200; fresh four-digit OTP. Response body schema unspecified. |
| `forgot-password` POST | `email` | 200; sends reset code. 404 for missing account. Response body schema unspecified. |
| `verify-reset-otp` POST | `email`, `otp` | 200; prechecks reset code. Does not change password. Response body schema unspecified. |
| `reset-password` POST | `email`, `otp`, `newPassword` | 200; validates code, updates password, marks email verified and revokes older sessions. Response body schema unspecified. |
| `me` GET / `refresh` POST / `logout` POST | Existing contracts retained | Current user / session refresh / cookie cleanup. Automatic refresh policy unchanged. |

Codes are strings with exactly four digits; leading zeroes are valid. Documented lifetime is five minutes and minimum password length is six. The UI's thirty-second resend cooldown is a UX choice; server throttling rules were not provided. Message-only endpoints accept empty success bodies or JSON objects, reject explicit `success: false`, and reject unexpected nonempty HTML/text/array bodies. Login/session endpoints validate their required response shape before continuing. HTTP/backend messages are rendered as text; unknown failures get generic messages, without exposing request configuration or private diagnostics.

## Signup session limitation

The registration endpoint currently issues a session before verification. To honor the user decision, the frontend does **not** set authenticated state after registration. It calls website logout successfully before requesting the verification code, then accepts only a successful login OTP response with `user.emailVerified: true` before setting the user and redirecting to `/buy`.

If logout or sending the code fails after account creation, a retry panel requests verification again without repeating registration. Back to sign in opens Login, where credentials can request another code. Refreshing loses the in-memory challenge; users sign in again rather than using an OTP/token in a URL or local storage.

This is a compensating frontend measure. **The backend must enforce verified-only access and avoid issuing a fully authorized session at registration.** Direct API clients and requests interrupted after server-side registration cannot be secured by this UI. Cookie attributes, controller-side authorization, resend behavior across logout, email delivery and live token revocation need backend verification in an approved test environment.

## Frontend organization

- `api/auth.ts`: typed auth responses and exact request bodies; optional AbortSignal; existing Google/me/refresh/logout preserved. `logoutWebsiteSession` strictly reports failures instead of using the existing best-effort combined logout.
- `zod/auth.ts`: shared email, credential, OTP and matching-password schemas. Confirmation stays local; reset sends only the three documented keys.
- `components/auth/AuthForm.tsx`: login/signup flow, verification gate, provisional-session cleanup, retry after account creation and verified `/buy` redirect.
- `CredentialFields.tsx`, `AuthField.tsx`, `AuthFormFrame.tsx`: existing visual layout/field behavior and login recovery link.
- `OtpVerificationForm.tsx`: accessible single code input, numeric keyboard/autofill/paste, leading zeros, expiry hint, resend/pending feedback, focus and timer cleanup. No automatic code requests on mount.
- `PasswordRecovery.tsx`, `RecoveryEmailForm.tsx`, `ResetPasswordForm.tsx`: email → OTP precheck → new password → confirmation. Reset still sends the original verified code because the final endpoint revalidates it. Expired final submissions offer a new-code path.
- `useAuthRequest.ts`: one active request, AbortController cleanup and safe error feedback. Inputs/actions disable while pending; obsolete completions do not update state or navigate.
- `app/forgot-password/page.tsx`: request-rendered Server Component using the existing account shell. Route selectors hide marketing navigation/footer, mobile bottom navigation and enquiry CTA. Metadata is `noindex`; public sitemap remains unchanged.

Passwords and codes are held only in component memory, cleared on stage completion/unmount, and never persisted or added to URLs. Successful reset clears local auth and calls the existing website/Google logout endpoints to clear old cookies. Recovery remains reachable with stale cookies; existing Login/Register cookie-presence redirects are unchanged. Public anonymous 401 checks remain unchanged.

## Verification

`node output/auth-otp/check-auth.cjs` executes actual API/schema/component/hook code through React DOM/jsdom with an isolated Axios adapter. Fifteen checks cover exact payloads and credentials/proxy/signals, leading zero OTPs, invalid local inputs, malformed/false/unverified responses, login/signup gating, bad-code retry, failed code/session-cleanup retry without duplicate registration, cancellation, password mismatch/final-code failure/session cleanup, both resend purposes/cooldown/expiry/timer cleanup, safe error feedback and preserved Google endpoints/callbacks. No network is used by these checks. The legacy `node output/auth/verify-auth.cjs` entry point delegates here.

The test uses the already available jsdom package, with no production/package-lock dependency changes. For another environment, make jsdom resolvable or set `DREAMKEY_JSDOM_MODULE` to its installed path. Framework shell/navigation/store/icon boundaries are adapted; the test is not evidence of actual cookie delivery or backend authentication.

`output/auth-otp/mock-backend.cjs` is a loopback-only browser fixture on `127.0.0.1:4187`, never a backend proxy. A temporary Next dev process used `API_URL=http://127.0.0.1:4187` on port 3031 without changing `.env`. Dummy-only signup → OTP → Buy and email → reset precheck → password → success → Login were exercised. Bad codes, mismatched passwords and recovery from a stopped mock server showed error feedback and successful retry. No real email, account creation, provider consent or password mutation occurred.

Browser layout measurements: desktop 1280×720, phone 390×844 and narrow/short 320×568 have no document overflow. On the short viewport the existing form panel scrolls to keep actions accessible. Screenshots are under `output/auth-otp/`; desktop OTP and phone reset examples were inspected. Native physical keyboard/SMS autofill and future dark appearance were not exercised.

Production webpack build (including TypeScript), scoped ESLint and diff whitespace checks passed. `node output/auth-otp/check-ssr.cjs` confirms HTTP 200, real initial fields, noindex metadata, one standalone header/footer and no floating enquiry link on all three account routes. It also checks the unchanged ten-URL public sitemap, recovery exclusion/access with stale cookies, and existing Login/Register cookie redirects. Evidence: `production-verification.json`. No commit/push/deployment is included. Live delivery and verified-only backend enforcement remain follow-ups.
