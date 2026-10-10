# Public website enquiry contract

Updated 10 October 2026 from the user's supplied endpoint documentation and Prisma `WebsiteEnquiry` model. The backend is outside this repository; its controller/schema validators were not independently inspected.

## Request and validation

POST `/v1/website/enquiry` is public and needs no authentication. The shared Axios client uses `/api-proxy`, with the existing server rewrite forwarding to the backend. No Authorization header was introduced; existing cookie behavior is preserved.

| Request field          | Frontend requirement                                                               |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `fullName`             | Required, trimmed; existing minimum two characters retained                        |
| `mobileNo`             | Required, ten local digits; common local/+91 input normalized to `+91 12345 67890` |
| `email`                | Required, trimmed, valid email                                                     |
| `propertyType`         | Required, nonblank; existing property type choices retained                        |
| `preferredLocation`    | Required, trimmed, nonblank                                                        |
| `estimatedBudgetBand`  | Required, trimmed, nonblank; expected selling price on Sell                        |
| `specificRequirements` | Optional message; existing `Enquiry: <purpose>.` prefix retained                   |

The six required fields follow the model's nonnullable input columns; the nonblank frontend checks prevent empty-string submissions. The model alone does not establish the controller's additional length limits, allowed values or phone rules. The new phone grouping follows the supplied example, rather than claiming an independently verified backend regex.

`enquiryRequest()` sends only these seven keys, trimming textual values and serializing an absent message as an empty string for direct adapter callers. Form submission keeps its existing purpose prefix even with an empty message. Database-managed ID/status/notes/timestamps and the form-only `purpose` never enter the request.

## UI and response handling

Contact and Sell share `components/pages/EnquiryPropertyFields.tsx` and `EnquiryContactFields.tsx`. All six fields carry native required semantics and schema validation; the message remains optional. The themed Select preserves its native FormData/SSR fallback. `SellerPropertyFields.tsx` is retained as a small wrapper for older consumers.

`api/enquiry.ts` types the HTTP 201 success envelope and HTTP 400 validation envelope. Confirmation requires `success: true`; a resolved failure or missing/malformed success flag cannot report success. The form shows the backend's success `message`, with its original thank-you text as fallback. An Axios rejection with a nonempty `error` displays that validation message; network failures or missing/malformed error bodies display a generic retry message. Messages are rendered as text, never HTML. Existing entered values remain available after failure; the pending state disables submission, and Send another enquiry restores the form.

The returned record type allows nullable `specificRequirements`, as the supplied Prisma model does, and includes the documented status/timestamps. This does not add CRM controls to the website.

Implementation: `api/enquiry.ts`, `zod/enquiry.ts`, `lib/phone.ts`, `components/pages/PropertyEnquiryForm.tsx`, `EnquiryContactFields.tsx`, `EnquiryPropertyFields.tsx`, `enquiry-values.ts`.

## Verification and limits

- Scoped ESLint, TypeScript and `npm run build -- --webpack` passed.
- `node output/enquiry/check-enquiry.cjs` runs the actual schema, request adapter, component server rendering and submit handler against isolated Axios responses and deterministic state controls. It covers required/whitespace/email validation, phone formats, exact payload/path/proxy, HTTP 201/400 messages, false/malformed success, network fallback, pending guard, optional message, reset/retry and seller purpose. No network POST is sent. Results: `output/enquiry/verification.json`.
- Local production browser checks confirmed the Contact property dropdown and native invalid-submit focus. Contact and Sell exposed the six required inputs with an optional message, with no horizontal overflow at a 390px viewport. Contact preview: `output/enquiry/contact-form.png`.
- No live CRM lead was created. Live endpoint acceptance, delivery and backend validation beyond the supplied contract remain unverified; exercise them in an approved test environment before claiming end-to-end integration.

Older `docs/interior-pages.md` phone formatting is historical and superseded here. Application routes, theme, authentication and proxy configuration were not changed.
