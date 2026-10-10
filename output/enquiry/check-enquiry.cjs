// Execute the real schema, Axios adapter and form handler without sending CRM leads.
// Run from the repository root: node output/enquiry/check-enquiry.cjs
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { AxiosError } = require("axios");
const root = process.cwd();
const cache = new Map();
let icons;
function load(relative, overrides = {}) {
  const file = path.resolve(root, relative);
  if (cache.has(file) && !Object.keys(overrides).length) return cache.get(file);
  const mod = new Module(file);
  mod.filename = file;
  mod.paths = Module._nodeModulePaths(path.dirname(file));
  mod.require = (name) => {
    if (Object.hasOwn(overrides, name)) return overrides[name];
    // Use the package's ESM entry; its CommonJS filename is inside a type:module package.
    if (name === "@phosphor-icons/react") return icons;
    if (name.endsWith(".css"))
      return {
        __esModule: true,
        default: new Proxy({}, { get: (_, key) => String(key) }),
      };
    if (name.startsWith("@/") || name.startsWith(".")) {
      const base = name.startsWith("@/")
        ? path.join(root, name.slice(2))
        : path.resolve(path.dirname(file), name);
      for (const ext of [".ts", ".tsx"])
        if (fs.existsSync(base + ext)) return load(base + ext);
    }
    return Module.createRequire(file)(name);
  };
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  mod._compile(code, file);
  if (!Object.keys(overrides).length) cache.set(file, mod.exports);
  return mod.exports;
}

const { propertyEnquirySchema } = load("zod/enquiry.ts");
const { normalizeIndianMobile } = load("lib/phone.ts");
const { enquiryApi, enquiryRequest, getEnquiryErrorMessage } =
  load("api/enquiry.ts");
const { apiClient } = load("api/client.ts");
const sample = {
  fullName: "Rahul Sharma",
  mobileNo: "+91 9876543210",
  email: "rahul@example.com",
  propertyType: "2BHK Apartment",
  preferredLocation: "Andheri West, Mumbai",
  estimatedBudgetBand: "50L - 80L",
  specificRequirements: "Near metro station, parking required",
};
const message =
  "Your enquiry has been submitted successfully. Our team will contact you shortly.";
const success = {
  success: true,
  message,
  enquiry: {
    ...sample,
    id: "mock-enquiry",
    status: "NEW",
    createdAt: "2026-10-10T17:34:51.959Z",
    updatedAt: "2026-10-10T17:34:51.959Z",
  },
};
const requests = [];
let reply = success;
let failure;
let wait;
apiClient.defaults.adapter = async (config) => {
  requests.push({
    url: config.url,
    baseURL: config.baseURL,
    method: config.method,
    body: JSON.parse(config.data),
    authorization: config.headers.get("Authorization"),
  });
  if (wait) await wait;
  if (failure === "network")
    throw new AxiosError("Network Error", "ERR_NETWORK", config);
  const response = {
    data: reply,
    status: failure ? 400 : 201,
    statusText: failure ? "Bad Request" : "Created",
    config,
    headers: {},
  };
  if (failure)
    throw new AxiosError(
      "Request failed with status code 400",
      "ERR_BAD_REQUEST",
      config,
      undefined,
      response,
    );
  return response;
};

function find(node, predicate) {
  if (!node || typeof node !== "object") return;
  if (predicate(node)) return node;
  for (const child of [node.props?.children].flat(Infinity)) {
    const result = find(child, predicate);
    if (result) return result;
  }
}
function formHarness(props = {}) {
  const states = [],
    refs = [];
  let cursor = 0,
    focused;
  const hooks = {
    useState(initial) {
      const index = cursor++;
      if (!(index in states)) states[index] = initial;
      return [
        states[index],
        (value) => {
          states[index] =
            typeof value === "function" ? value(states[index]) : value;
        },
      ];
    },
    useRef() {
      const index = cursor++;
      return (refs[index] ||= {
        current: {
          querySelector: (selector) => ({
            focus: () => {
              focused = selector;
            },
          }),
        },
      });
    },
  };
  const Form = load("components/pages/PropertyEnquiryForm.tsx", {
    react: hooks,
  }).default;
  return {
    render: () => {
      cursor = 0;
      return Form(props);
    },
    focused: () => focused,
  };
}

async function main() {
  assert.equal(propertyEnquirySchema.safeParse(sample).success, true);
  for (const field of [
    "fullName",
    "mobileNo",
    "email",
    "propertyType",
    "preferredLocation",
    "estimatedBudgetBand",
  ]) {
    assert.equal(
      propertyEnquirySchema.safeParse({ ...sample, [field]: "  " }).success,
      false,
      field,
    );
    const missing = { ...sample };
    delete missing[field];
    assert.equal(
      propertyEnquirySchema.safeParse(missing).success,
      false,
      "missing " + field,
    );
  }
  const optional = { ...sample };
  delete optional.specificRequirements;
  assert.equal(propertyEnquirySchema.safeParse(optional).success, true);
  assert.equal(
    propertyEnquirySchema.safeParse({ ...sample, email: "not-an-email" })
      .success,
    false,
  );
  for (const number of [
    "9876543210",
    "98765 43210",
    "+919876543210",
    "+91 98765 43210",
    "91 9876543210",
  ]) {
    const normalized = normalizeIndianMobile(number);
    assert.equal(normalized, sample.mobileNo);
    assert.equal(
      propertyEnquirySchema.safeParse({ ...sample, mobileNo: normalized })
        .success,
      true,
    );
    assert.equal(
      enquiryRequest({ ...sample, mobileNo: number }).mobileNo,
      sample.mobileNo,
    );
  }
  for (const number of ["123", "98765432101", "+1 9876543210"])
    assert.equal(
      propertyEnquirySchema.safeParse({
        ...sample,
        mobileNo: normalizeIndianMobile(number),
      }).success,
      false,
    );

  assert.deepEqual(await enquiryApi.submitPropertyEnquiry(sample), success);
  assert.deepEqual(requests.at(-1).body, sample);
  assert.equal(requests.at(-1).url, "/v1/website/enquiry");
  assert.equal(requests.at(-1).baseURL, "/api-proxy");
  assert.equal(requests.at(-1).method, "post");
  assert.ok(
    !requests.at(-1).authorization,
    "Public enquiry needs no Authorization header",
  );
  assert.deepEqual(
    Object.keys(
      enquiryRequest({ ...sample, purpose: "buy", secret: "not-sent" }),
    ).sort(),
    Object.keys(sample).sort(),
  );
  reply = {
    success: false,
    error: "Email is required",
    code: "VALIDATION_ERROR",
  };
  failure = true;
  await assert.rejects(
    enquiryApi.submitPropertyEnquiry(sample),
    (error) => getEnquiryErrorMessage(error) === "Email is required",
  );
  failure = false;
  await assert.rejects(
    enquiryApi.submitPropertyEnquiry(sample),
    (error) => getEnquiryErrorMessage(error) === "Email is required",
  );
  for (const malformed of [
    null,
    {},
    "<html>Service unavailable</html>",
    { success: false, error: {} },
  ]) {
    reply = malformed;
    await assert.rejects(enquiryApi.submitPropertyEnquiry(sample), (error) =>
      getEnquiryErrorMessage(error).startsWith("We couldn’t send"),
    );
  }
  failure = "network";
  await assert.rejects(enquiryApi.submitPropertyEnquiry(sample), (error) =>
    getEnquiryErrorMessage(error).startsWith("We couldn’t send"),
  );
  assert.ok(
    !getEnquiryErrorMessage(
      new Error("private implementation details"),
    ).includes("private"),
  );
  failure = false;
  reply = success;

  icons = await import("@phosphor-icons/react");
  const Form = load("components/pages/PropertyEnquiryForm.tsx").default;
  for (const variant of ["contact", "sell"]) {
    const html = renderToStaticMarkup(React.createElement(Form, { variant }));
    for (const field of [
      "fullName",
      "mobileNo",
      "email",
      "propertyType",
      "preferredLocation",
      "estimatedBudgetBand",
    ]) {
      const control = html.match(
        new RegExp(`<(?:input|select)\\b[^>]*name="${field}"[^>]*>`),
      )?.[0];
      assert.ok(
        control?.includes('required=""'),
        variant + " requires " + field,
      );
    }
    assert.ok(
      !html.match(/<textarea\b[^>]*required/),
      "Message remains optional",
    );
  }

  const OriginalFormData = global.FormData;
  global.FormData = class {
    constructor(values) {
      this.values = values;
    }
    get(key) {
      return this.values[key] || "";
    }
  };
  try {
    const contact = formHarness({ variant: "contact", initialPurpose: "buy" });
    const values = { ...sample, purpose: "buy" };
    const event = (data) => ({ preventDefault() {}, currentTarget: data });
    const before = requests.length;
    await contact
      .render()
      .props.onSubmit(event({ ...values, email: "", preferredLocation: " " }));
    assert.equal(requests.length, before, "Invalid form makes no request");
    assert.match(contact.focused(), /contact-email/);
    let release;
    wait = new Promise((resolve) => {
      release = resolve;
    });
    const pending = contact.render().props.onSubmit(event(values));
    const sending = contact.render();
    assert.equal(
      find(sending, (n) => n.type === "button" && n.props.type === "submit")
        .props.disabled,
      true,
    );
    await sending.props.onSubmit(event(values));
    release();
    await pending;
    wait = undefined;
    assert.equal(
      requests.length,
      before + 1,
      "No second submission while sending",
    );
    assert.equal(
      requests.at(-1).body.specificRequirements,
      "Enquiry: buy. " + sample.specificRequirements,
    );
    assert.equal(contact.render().props.role, "status");
    assert.equal(
      find(contact.render(), (n) => n.type === "p").props.children,
      message,
    );
    find(contact.render(), (n) => n.type === "button").props.onClick();
    assert.equal(contact.render().type, "form");
    failure = true;
    reply = {
      success: false,
      error: "Budget is required",
      code: "VALIDATION_ERROR",
    };
    await contact.render().props.onSubmit(event(values));
    const alert = find(contact.render(), (n) => n.props?.role === "alert");
    assert.ok(alert && alert.props.children.includes("Budget is required"));
    assert.equal(
      contact.render().type,
      "form",
      "Failure preserves editable form",
    );
    failure = false;
    reply = success;
    await formHarness({ variant: "sell" })
      .render()
      .props.onSubmit(
        event({ ...values, specificRequirements: "", purpose: "rent" }),
      );
    assert.equal(requests.at(-1).body.specificRequirements, "Enquiry: sell.");
  } finally {
    global.FormData = OriginalFormData;
  }

  const evidence = {
    checkedAt: new Date().toISOString(),
    endpoint: "/v1/website/enquiry",
    requiredFields: [
      "fullName",
      "mobileNo",
      "email",
      "propertyType",
      "preferredLocation",
      "estimatedBudgetBand",
    ],
    optionalFields: ["specificRequirements"],
    checks: [
      "required/whitespace/email validation",
      "Indian phone normalization",
      "exact public POST payload and proxy",
      "201 success envelope/message",
      "400 validation message",
      "success:false and malformed body cannot report success",
      "network fallback",
      "SSR required fields on Contact and Sell",
      "real form handler validation, sending guard, success/reset, backend error and seller purpose",
    ],
    scope:
      "Isolated Axios adapter, real schema, real component SSR and form-handler state adapter. No production lead created; not live backend or browser interaction verification.",
  };
  fs.writeFileSync(
    path.join(__dirname, "verification.json"),
    JSON.stringify(evidence, null, 2) + "\n",
  );
  console.log(
    "Passed enquiry contract, validation, SSR and form-handler regression checks; no live CRM request sent.",
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
