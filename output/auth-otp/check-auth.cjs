// Executes the real API adapters, schemas, React components and hooks in jsdom.
// All HTTP is replaced at the Axios adapter; no real email/account/password changes.
// Optional dependency location: DREAMKEY_JSDOM_MODULE=/path/to/jsdom
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const ts = require("typescript");
let jsdomPath = process.env.DREAMKEY_JSDOM_MODULE;
if (!jsdomPath) {
  try {
    jsdomPath = require.resolve("jsdom");
  } catch {
    const cache = path.join(require("node:os").homedir(), ".npm/_npx");
    jsdomPath = fs
      .readdirSync(cache)
      .map((p) => path.join(cache, p, "node_modules/jsdom"))
      .find((p) => fs.existsSync(path.join(p, "package.json")));
  }
}
if (!jsdomPath) throw new Error("Provide jsdom through DREAMKEY_JSDOM_MODULE.");
const { JSDOM } = require(jsdomPath);
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/",
});
Object.assign(global, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  IS_REACT_ACT_ENVIRONMENT: true,
});
const React = require("react");
const { act } = React;
const { createRoot } = require("react-dom/client");
const { AxiosError } = require("axios");
const calls = [],
  navigation = [],
  users = [],
  checks = [];
const user = {
  id: "local-mock",
  name: "Test Resident",
  email: "resident@example.com",
  emailVerified: true,
};
const router = Object.fromEntries(
  ["push", "replace", "refresh"].map((k) => [
    k,
    (...args) => navigation.push([k, ...args]),
  ]),
);
const state = { setUser: (value) => users.push(value) };
const useAuthStore = Object.assign(() => state, { getState: () => state });
const modules = new Map();
const mocks = {
  "next/navigation": { useRouter: () => router },
  "next/link": {
    __esModule: true,
    default: ({ children, ...props }) =>
      React.createElement("a", props, children),
  },
  "@phosphor-icons/react": new Proxy(
    {},
    { get: () => () => React.createElement("svg", { "aria-hidden": true }) },
  ),
  sonner: { toast: { success: () => {} } },
  "@/store/authStore": { useAuthStore },
};
function load(file) {
  file = path.resolve(file);
  if (modules.has(file)) return modules.get(file).exports;
  const mod = { exports: {} };
  modules.set(file, mod);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  function localRequire(name) {
    if (name in mocks) return mocks[name];
    if (name.endsWith(".module.css"))
      return { __esModule: true, default: new Proxy({}, { get: (_, k) => k }) };
    if (name.startsWith("@/") || name.startsWith(".")) {
      const base = name.startsWith("@/")
        ? path.resolve(name.slice(2))
        : path.resolve(path.dirname(file), name);
      return load(
        [".ts", ".tsx", ""]
          .map((ext) => base + ext)
          .find((p) => fs.existsSync(p)),
      );
    }
    return require(name);
  }
  new Function("require", "module", "exports", code)(
    localRequire,
    mod,
    mod.exports,
  );
  return mod.exports;
}
const { apiClient } = load("api/client.ts");
const { authApi, AuthResponseError } = load("api/auth.ts");
const schemas = load("zod/auth.ts");
let respond;
apiClient.defaults.adapter = async (config) => {
  const body = config.data ? JSON.parse(config.data) : undefined;
  const call = {
    url: config.url,
    body,
    signal: config.signal,
    credentials: config.withCredentials,
    base: config.baseURL,
  };
  calls.push(call);
  const reply = await respond(call);
  const response = {
    status: 200,
    statusText: "OK",
    config,
    headers: {},
    ...reply,
  };
  if (response.status >= 400)
    throw new AxiosError(
      "Mock request failed",
      "ERR_BAD_REQUEST",
      config,
      undefined,
      response,
    );
  return response;
};
function happy({ url, body }) {
  if (url.endsWith("/register"))
    return { status: 201, data: { user: { ...user, emailVerified: false } } };
  if (url.endsWith("/login"))
    return {
      data: {
        success: true,
        requiresOtp: true,
        email: body.email,
        message: "Check your email.",
      },
    };
  if (url.endsWith("/verify-login-otp"))
    return body.otp === "0123"
      ? { data: { success: true, user } }
      : { status: 400, data: { message: "Invalid or expired OTP" } };
  if (url.endsWith("/verify-reset-otp"))
    return body.otp === "0123"
      ? { data: { message: "Code verified" } }
      : { status: 400, data: { message: "Invalid or expired OTP" } };
  return { data: { message: "Request completed" } };
}
function reset() {
  calls.length = navigation.length = users.length = 0;
  respond = happy;
}
async function render(Component, props = {}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  await act(async () => root.render(React.createElement(Component, props)));
  return {
    container,
    async close() {
      await act(async () => root.unmount());
      container.remove();
    },
  };
}
async function input(name, value) {
  const element = document.querySelector(`[name="${name}"]`);
  assert.ok(element, `missing ${name}`);
  await act(async () => {
    Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    ).set.call(element, value);
    element.dispatchEvent(new window.Event("input", { bubbles: true }));
  });
}
async function submit() {
  await act(async () =>
    document
      .querySelector("form")
      .dispatchEvent(
        new window.Event("submit", { bubbles: true, cancelable: true }),
      ),
  );
}
async function click(text) {
  const button = [...document.querySelectorAll("button")].find(
    (el) => el.textContent === text,
  );
  assert.ok(button, `missing button ${text}`);
  await act(async () => button.click());
}
const AuthForm = load("components/auth/AuthForm.tsx").default;
const Recovery = load("components/auth/PasswordRecovery.tsx").default;
const OtpForm = load("components/auth/OtpVerificationForm.tsx").default;
const text = () => document.body.textContent;
async function credentials(mode) {
  if (mode === "register") await input("name", "Test Resident");
  await input("email", "resident@example.com");
  await input("password", "dummy-password");
}
async function check(name, run) {
  reset();
  await run();
  checks.push(name);
}
(async () => {
  await check(
    "schemas reject invalid email/code/password and preserve leading-zero OTP",
    async () => {
      assert.equal(
        schemas.emailSchema.safeParse({ email: "bad" }).success,
        false,
      );
      assert.equal(
        schemas.otpSchema.safeParse({ email: user.email, otp: "123" }).success,
        false,
      );
      assert.equal(
        schemas.otpSchema.parse({ email: user.email, otp: "0123" }).otp,
        "0123",
      );
      assert.equal(
        schemas.resetPasswordSchema.safeParse({
          email: user.email,
          otp: "0123",
          newPassword: "dummy-password",
          confirmPassword: "different",
        }).success,
        false,
      );
    },
  );
  await check(
    "adapter exact payloads, cookie/proxy/signal preservation and unspecified 200 responses",
    async () => {
      const signal = new AbortController().signal;
      await authApi.login(
        { email: user.email, password: "dummy-password", extra: true },
        signal,
      );
      await authApi.resetPassword(
        {
          email: user.email,
          otp: "0123",
          newPassword: "dummy-new-password",
          confirmPassword: "must-not-send",
        },
        signal,
      );
      assert.deepEqual(Object.keys(calls[0].body).sort(), [
        "email",
        "password",
      ]);
      assert.deepEqual(Object.keys(calls[1].body).sort(), [
        "email",
        "newPassword",
        "otp",
      ]);
      assert.ok(
        calls.every(
          (c) =>
            c.credentials && c.base === "/api-proxy" && c.signal === signal,
        ),
      );
      respond = () => ({ data: undefined });
      await authApi.forgotPassword({ email: user.email });
      await authApi.verifyResetOtp({ email: user.email, otp: "0123" });
      await authApi.resendOtp({ email: user.email, purpose: "PASSWORD_RESET" });
    },
  );
  await check(
    "malformed login/session, explicit failures and unverified OTP response reject",
    async () => {
      for (const data of [
        { user },
        { success: false, message: "Rejected" },
        null,
      ]) {
        respond = () => ({ data });
        await assert.rejects(
          authApi.login({ email: user.email, password: "dummy-password" }),
          AuthResponseError,
        );
      }
      for (const emailVerified of [false, undefined]) {
        respond = () => ({
          data: { success: true, user: { ...user, emailVerified } },
        });
        await assert.rejects(
          authApi.verifyLoginOtp({ email: user.email, otp: "0123" }),
          AuthResponseError,
        );
      }
      respond = () => ({ data: { success: false, message: "Logout failed" } });
      await assert.rejects(authApi.logoutWebsiteSession(), /Logout failed/);
      for (const data of ["<html>unexpected proxy response</html>", []]) {
        respond = () => ({ data });
        await assert.rejects(
          authApi.forgotPassword({ email: user.email }),
          AuthResponseError,
        );
        await assert.rejects(
          authApi.resetPassword({
            email: user.email,
            otp: "0123",
            newPassword: "dummy-password",
          }),
          AuthResponseError,
        );
      }
    },
  );
  for (const mode of ["login", "register"]) {
    await check(
      `${mode}: blank fields stay local with first-field focus`,
      async () => {
        const ui = await render(AuthForm, { mode });
        await submit();
        assert.equal(calls.length, 0);
        assert.equal(
          document.activeElement.name,
          mode === "login" ? "email" : "name",
        );
        assert.equal(
          document.querySelectorAll('input[aria-invalid="true"]').length,
          mode === "login" ? 2 : 3,
        );
        await ui.close();
      },
    );
    await check(
      `${mode}: OTP required before auth/redirect, bad code retry, verified session redirect`,
      async () => {
        const ui = await render(AuthForm, { mode });
        await credentials(mode);
        await submit();
        assert.ok(document.querySelector('[name="otp"]'));
        assert.equal(users.length, 0);
        assert.equal(navigation.length, 0);
        assert.equal(document.querySelector('[name="password"]'), null);
        assert.deepEqual(
          calls.map((c) => c.url.split("/").at(-1)),
          mode === "login" ? ["login"] : ["register", "logout", "resend-otp"],
        );
        if (mode === "register")
          assert.deepEqual(calls[2].body, {
            email: user.email,
            purpose: "LOGIN",
          });
        await input("otp", "9999");
        await submit();
        assert.ok(text().includes("Invalid or expired OTP"));
        assert.equal(users.length, 0);
        await input("otp", "0123");
        await submit();
        assert.deepEqual(users, [user]);
        assert.deepEqual(navigation, [["push", "/buy"], ["refresh"]]);
        assert.equal(calls.at(-1).body.otp, "0123");
        await ui.close();
      },
    );
  }
  await check(
    "signup send failure retries code without duplicate registration",
    async () => {
      let fail = true;
      respond = (call) =>
        call.url.endsWith("/resend-otp") && fail
          ? ((fail = false),
            { status: 503, data: { message: "Try sending again" } })
          : happy(call);
      const ui = await render(AuthForm, { mode: "register" });
      await credentials("register");
      await submit();
      assert.ok(text().includes("Your account has been created"));
      assert.ok(text().includes("Try sending again"));
      assert.equal(document.querySelector('[name="password"]'), null);
      await click("Send verification code");
      assert.ok(document.querySelector('[name="otp"]'));
      assert.equal(calls.filter((c) => c.url.endsWith("/register")).length, 1);
      assert.equal(users.length, 0);
      await ui.close();
    },
  );
  await check(
    "signup must clear provisional session before sending code; logout failure is retryable",
    async () => {
      let fail = true;
      respond = (call) =>
        call.url.endsWith("/logout") && fail
          ? ((fail = false),
            { status: 503, data: { message: "Please retry verification" } })
          : happy(call);
      const ui = await render(AuthForm, { mode: "register" });
      await credentials("register");
      await submit();
      assert.equal(
        calls.some((c) => c.url.endsWith("/resend-otp")),
        false,
      );
      assert.equal(users.length, 0);
      await click("Send verification code");
      assert.ok(document.querySelector('[name="otp"]'));
      assert.deepEqual(
        calls.map((c) => c.url.split("/").at(-1)),
        ["register", "logout", "logout", "resend-otp"],
      );
      await ui.close();
    },
  );
  await check(
    "cancelled OTP returns to login without authentication",
    async () => {
      const ui = await render(AuthForm, { mode: "login" });
      await credentials("login");
      await submit();
      await click("Back to sign in");
      assert.ok(document.querySelector('[name="password"]'));
      assert.equal(users.length, 0);
      await ui.close();
    },
  );
  await check("login pending guard and abort on unmount", async () => {
    let finish;
    respond = () =>
      new Promise((resolve) => {
        finish = resolve;
      });
    const ui = await render(AuthForm, { mode: "login" });
    await credentials("login");
    await submit();
    await submit();
    assert.equal(calls.length, 1);
    assert.ok(document.querySelector('[type="submit"]').disabled);
    const signal = calls[0].signal;
    await ui.close();
    assert.ok(signal.aborted);
    await act(async () => {
      finish({ data: { success: true, requiresOtp: true, email: user.email } });
    });
    assert.equal(users.length, 0);
    assert.equal(navigation.length, 0);
  });
  await check(
    "reset complete flow, local mismatch, expired reset failure, no premature auth and session cleanup",
    async () => {
      const ui = await render(Recovery);
      await submit();
      assert.equal(calls.length, 0);
      await input("email", user.email);
      await submit();
      assert.ok(document.querySelector('[name="otp"]'));
      await input("otp", "9999");
      await submit();
      assert.ok(text().includes("Invalid or expired OTP"));
      await input("otp", "0123");
      await submit();
      assert.ok(document.querySelector('[name="newPassword"]'));
      assert.equal(users.length, 0);
      assert.equal(
        calls.some((c) => c.url.endsWith("/reset-password")),
        false,
      );
      await input("newPassword", "dummy-new-password");
      await input("confirmPassword", "different");
      await submit();
      assert.ok(text().includes("Passwords don’t match"));
      assert.equal(document.activeElement.name, "confirmPassword");
      await input("confirmPassword", "dummy-new-password");
      respond = (call) =>
        call.url.endsWith("/reset-password")
          ? { status: 400, data: { error: "Reset code expired" } }
          : happy(call);
      await submit();
      assert.ok(text().includes("Reset code expired"));
      assert.equal(users.length, 0);
      respond = happy;
      await submit();
      assert.ok(text().includes("Your password has been updated"));
      assert.deepEqual(users, [null]);
      assert.equal(document.querySelector("input"), null);
      assert.deepEqual(
        calls.slice(-3).map((c) => c.url),
        [
          "/v1/user/auth/reset-password",
          "/v1/user/auth/logout",
          "/api/auth/sign-out",
        ],
      );
      assert.deepEqual(calls.at(-3).body, {
        email: user.email,
        otp: "0123",
        newPassword: "dummy-new-password",
      });
      assert.ok(document.querySelector('a[href="/login"]'));
      await ui.close();
    },
  );
  await check(
    "resend cooldown, both purposes, OTP expiry, replacement-code clear and timer cleanup",
    async () => {
      const originalNow = Date.now;
      const originalSet = window.setInterval;
      const originalClear = window.clearInterval;
      let time = originalNow(),
        tick,
        cleared = 0;
      Date.now = () => time;
      window.setInterval = (fn) => {
        tick = fn;
        return 123;
      };
      window.clearInterval = () => {
        cleared++;
      };
      try {
        for (const purpose of ["LOGIN", "PASSWORD_RESET"]) {
          const ui = await render(OtpForm, {
            email: user.email,
            purpose,
            onVerify: async () => {},
            onBack: () => {},
          });
          const before = calls.length;
          await click("Resend code in 30s");
          assert.equal(calls.length, before);
          await input("otp", "9999");
          time += 301000;
          await act(async () => tick());
          assert.ok(text().includes("may have expired"));
          await click("Resend code");
          assert.deepEqual(calls.at(-1).body, { email: user.email, purpose });
          assert.equal(document.querySelector('[name="otp"]').value, "");
          assert.equal(document.activeElement.name, "otp");
          assert.ok(text().includes("Resend code in 30s"));
          await ui.close();
        }
        assert.equal(cleared, 2);
      } finally {
        Date.now = originalNow;
        window.setInterval = originalSet;
        window.clearInterval = originalClear;
      }
    },
  );
  await check(
    "Google-only, rate-limit, malformed/network errors render safe feedback",
    async () => {
      for (const response of [
        { status: 400, data: { code: "USE_GOOGLE_LOGIN" } },
        { status: 429, data: {} },
        { status: 500, data: "<html>private diagnostic</html>" },
      ]) {
        respond = () => response;
        const ui = await render(AuthForm, { mode: "login" });
        await credentials("login");
        await submit();
        const error = document.querySelector('[role="alert"]').textContent;
        assert.ok(
          error.includes(
            response.status === 400
              ? "Continue with Google"
              : response.status === 429
                ? "Too many attempts"
                : "couldn’t start sign-in",
          ),
        );
        assert.ok(!error.includes("private diagnostic"));
        assert.equal(users.length, 0);
        await ui.close();
      }
      respond = () => {
        throw new Error("private network config");
      };
      const ui = await render(AuthForm, { mode: "login" });
      await credentials("login");
      await submit();
      assert.ok(!text().includes("private network config"));
      await ui.close();
    },
  );
  await check(
    "Google endpoint, callback and connection-failure feedback remain intact",
    async () => {
      respond = () => ({ data: { url: "https://accounts.google.com/mock" } });
      assert.equal(
        await authApi.googleSignIn(),
        "https://accounts.google.com/mock",
      );
      assert.deepEqual(calls.at(-1).body, {
        provider: "google",
        callbackURL: "http://localhost/",
        errorCallbackURL: "http://localhost/login",
      });
      respond = () => {
        throw new Error("mock network");
      };
      const ui = await render(AuthForm, { mode: "login" });
      await click("Continue with Google");
      assert.ok(text().includes("Couldn’t start Google sign-in"));
      assert.equal(users.length, 0);
      await ui.close();
    },
  );
  const result = {
    passed: checks.length,
    checks,
    scope:
      "Actual source in React/jsdom with isolated Axios adapter; no live backend requests.",
  };
  fs.writeFileSync(
    "output/auth-otp/verification.json",
    JSON.stringify(result, null, 2) + "\n",
  );
  console.log(JSON.stringify(result, null, 2));
  dom.window.close();
})().catch((error) => {
  console.error(error);
  dom.window.close();
  process.exitCode = 1;
});
