# OAuth API Requirements (Hono Backend)

This document outlines the REST API endpoints automatically exposed by Better Auth for the Next.js frontend to handle Google OAuth.

## Global Requirements
1. **Base URL:** All endpoints are mounted at `/api/auth`.
2. **Cookies:** Better Auth uses a cookie named `better-auth.session_token`. All successful authentications set this as an `HttpOnly`, `Secure` (in production), and `SameSite=Lax` cookie.
3. **CORS:** The Hono backend must have CORS configured with `credentials: true` so the frontend can send/receive cookies.

---

### 1. Initiate Google Login
Initiates the Google OAuth flow. The frontend sends this request, and the backend responds with the Google URL the user should be redirected to.

- **Endpoint:** `POST /api/auth/sign-in/social`
- **Request Body (JSON):**
  ```json
  {
    "provider": "google",
    "callbackURL": "http://localhost:3000/dashboard",
    "errorCallbackURL": "http://localhost:3000/login"
  }
  ```
- **Success Response (200 OK):**
  - **Body:**
    ```json
    {
      "url": "https://accounts.google.com/o/oauth2/v2/auth?client_id=...&redirect_uri=..."
    }
    ```
*(The frontend automatically redirects the user's browser to this `url`)*

---

### 2. Google Callback (Internal)
Google redirects the user here after they consent. This endpoint processes the authorization code, creates the user/session in the DB, sets the HTTP-Only cookie, and redirects the user back to the frontend.

- **Endpoint:** `GET /api/auth/callback/google`
- **Query Params:** `?code=...&state=...` (Provided automatically by Google)
- **Success Response (302 Redirect):**
  - **Headers:** 
    - `Set-Cookie: better-auth.session_token=...; HttpOnly; Secure; SameSite=Lax`
    - `Location: http://localhost:3000/dashboard` (Matches the `callbackURL` from step 1)

---

### 3. Get Current User / Session (Me)
Fetches the currently authenticated user's profile and session data. Used to hydrate the frontend state.

- **Endpoint:** `GET /api/auth/get-session`
- **Headers Needed:** Browser automatically attaches the `better-auth.session_token` cookie.
- **Success Response (200 OK):**
  - **Body:**
    ```json
    {
      "user": {
        "id": "user_12345",
        "name": "John Doe",
        "email": "john@example.com",
        "emailVerified": true,
        "image": "https://lh3.googleusercontent.com/a/...",
        "createdAt": "2024-10-04T12:00:00Z",
        "updatedAt": "2024-10-04T12:00:00Z"
      },
      "session": {
        "id": "session_67890",
        "expiresAt": "2024-10-11T12:00:00Z",
        "token": "...",
        "createdAt": "2024-10-04T12:00:00Z",
        "updatedAt": "2024-10-04T12:00:00Z",
        "userId": "user_12345"
      }
    }
    ```
- **Unauthenticated Response (200 OK):**
  - **Body:** `null`

---

### 4. Logout
Terminates the active session and clears the browser cookie.

- **Endpoint:** `POST /api/auth/sign-out`
- **Headers Needed:** Browser automatically attaches the `better-auth.session_token` cookie.
- **Success Response (200 OK):**
  - **Headers:** `Set-Cookie: better-auth.session_token=; Max-Age=0; HttpOnly; Secure; SameSite=Lax` (Clears the cookie)
  - **Body:** `{ "success": true }`
