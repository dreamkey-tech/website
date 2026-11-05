// Actual component handlers with React state/event adapters. No network or GA request.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const root = process.cwd();
const events = [];
const navigations = [];
let activeHooks;
const hooks = {
  useState: (...args) => activeHooks.useState(...args),
  useRef: (...args) => activeHooks.useRef(...args),
  useId: () => "select-test",
  useEffect: () => {},
  useSyncExternalStore: () => false,
  useTransition: () => [false, (callback) => callback()],
};
const router = { push: (...args) => navigations.push(args) };
const component = () => null;
const icons = new Proxy({}, { get: () => component });
const mocks = {
  react: hooks,
  "@/lib/analytics": {
    trackEvent: (name, params) => {
      events.push({ name, params });
      return true;
    },
  },
  "@phosphor-icons/react": icons,
  "@phosphor-icons/react/dist/ssr": icons,
  "@phosphor-icons/react/ssr": icons,
  "@radix-ui/react-select": new Proxy({}, { get: () => component }),
  "next/link": { __esModule: true, default: component },
  "next/image": { __esModule: true, default: component },
  "next/navigation": { useRouter: () => router },
};
const modules = new Map();
function load(relative) {
  const file = path.resolve(root, relative);
  if (modules.has(file)) return modules.get(file).exports;
  const mod = { exports: {} };
  modules.set(file, mod);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  function localRequire(name) {
    if (name in mocks) return mocks[name];
    if (name.endsWith(".module.css"))
      return {
        __esModule: true,
        default: new Proxy({}, { get: (_, key) => key }),
      };
    if (name.startsWith("@/") || name.startsWith(".")) {
      const base = name.startsWith("@/")
        ? path.join(root, name.slice(2))
        : path.resolve(path.dirname(file), name);
      return load([".ts", ".tsx"].map((ext) => base + ext).find(fs.existsSync));
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
function harness(file, props = {}) {
  const Component = load(file).default;
  const values = [];
  let cursor;
  const state = {
    useState(initial) {
      const index = cursor++;
      if (!(index in values)) values[index] = initial;
      return [
        values[index],
        (next) => {
          values[index] =
            typeof next === "function" ? next(values[index]) : next;
        },
      ];
    },
    useRef(initial) {
      const index = cursor++;
      return (values[index] ||= { current: initial });
    },
  };
  return {
    render() {
      cursor = 0;
      activeHooks = state;
      return Component(props);
    },
  };
}
function find(node, predicate) {
  if (!node || typeof node !== "object") return;
  if (predicate(node)) return node;
  for (const child of [node.props?.children].flat(Infinity)) {
    const result = find(child, predicate);
    if (result) return result;
  }
}
const checks = [];
function check(name, fn) {
  events.length = 0;
  fn();
  checks.push(name);
}
const filters = {
  q: "Private customer search never sent",
  type: "",
  budget: "",
  bedrooms: "",
  location: "",
  maxPrice: "",
  sort: "recommended",
  page: 1,
};
check(
  "Shared Select tracks only opted-in actual value changes through its native fallback",
  () => {
    const plain = harness("components/ui/Select.tsx", {
      options: [
        { value: "", label: "Any" },
        { value: "FLAT", label: "Apartment" },
      ],
    });
    find(plain.render(), (n) => n.type === "select").props.onChange({
      target: { value: "FLAT" },
    });
    assert.equal(events.length, 0);
    const selected = harness("components/ui/Select.tsx", {
      defaultValue: "",
      analytics: {
        component: "buy_search",
        filter: "type",
        transactionType: "buy",
      },
      options: [
        { value: "", label: "Any" },
        { value: "FLAT", label: "Apartment" },
      ],
    });
    find(selected.render(), (n) => n.type === "select").props.onChange({
      target: { value: "FLAT" },
    });
    find(selected.render(), (n) => n.type === "select").props.onChange({
      target: { value: "FLAT" },
    });
    assert.deepEqual(events, [
      {
        name: "property_search",
        params: {
          component_name: "buy_search",
          filter_name: "type",
          filter_value: "FLAT",
          transaction_type: "buy",
          interaction_type: "filter_change",
        },
      },
    ]);
  },
);
check(
  "Native Buy and Hero forms opt into one delegated submit event without handler duplication",
  () => {
    for (const [file, props, componentName] of [
      ["components/buy/BuySearch.tsx", { filters }, "buy_search"],
      ["components/home/HeroPropertySearch.tsx", {}, "hero_search"],
      ["components/buy/BuyFilters.tsx", { filters }, "buy_filters"],
    ]) {
      const form = find(
        harness(file, props).render(),
        (n) => n.type === "form",
      );
      assert.equal(form.props["data-analytics-search"], "buy");
      assert.equal(form.props["data-analytics-component"], componentName);
      assert.equal(form.props.onSubmit, undefined);
    }
    const field = harness("components/home/HeroSearchField.tsx", {
      name: "location",
      label: "Location",
      options: [{ value: "", label: "All Kolkata" }],
    });
    assert.equal(
      find(field.render(), (n) => n.props.analytics)?.props.analytics.component,
      "hero_search",
    );
    assert.equal(events.length, 0, "Render does not simulate interaction");
  },
);
check(
  "Buy neighbourhood changes emit once and unchanged reset does not emit",
  () => {
    const sidebar = harness("components/buy/BuyFilters.tsx", { filters: { ...filters, q: "" } });
    const select = (value) =>
      find(
        sidebar.render(),
        (n) =>
          n.type === "input" &&
          n.props.type === "radio" &&
          n.props.value === value,
      ).props.onChange();
    select("new-town");
    select("new-town");
    select("");
    assert.equal(events.length, 2);
    assert.equal(events[0].params.filter_value, "new-town");
    assert.equal(events[1].params.filter_value, "any");
    find(
      sidebar.render(),
      (n) => n.props.className === "linkButton",
    ).props.onClick();
    assert.equal(events.length, 2);
  },
);
check(
  "Price cap emits on commit only, deduplicates pointer/key/blur and tracks removal",
  () => {
    const budget = harness("components/buy/BuyBudget.tsx", { initial: "" });
    const range = () =>
      find(
        budget.render(),
        (n) => n.type === "input" && n.props.type === "range",
      );
    range().props.onBlur({ currentTarget: { value: "6" } });
    assert.equal(
      events.length,
      0,
      "Unchanged focus and blur is not a cap change",
    );
    for (const value of ["1", "2", "3"])
      range().props.onChange({ target: { value } });
    assert.equal(events.length, 0, "Range ticks stay local");
    range().props.onPointerUp({ currentTarget: { value: "3" } });
    range().props.onBlur({ currentTarget: { value: "3" } });
    range().props.onKeyUp({ currentTarget: { value: "3" } });
    assert.equal(events.length, 1);
    assert.equal(events[0].params.filter_value, "30000000");
    range().props.onChange({ target: { value: "4" } });
    range().props.onKeyUp({ currentTarget: { value: "4" } });
    assert.equal(events.length, 2);
    find(budget.render(), (n) => n.type === "button").props.onClick();
    assert.equal(events.length, 3);
    assert.equal(events[2].params.filter_value, "any");
  },
);
check(
  "Buy sort event preserves existing router arguments and excludes search text",
  () => {
    const results = harness("components/buy/BuyResults.tsx", {
      filters,
      total: 1,
      first: 1,
      last: 1,
    });
    find(results.render(), (n) => n.props.id === "buy-sort").props.onChange(
      "price-asc",
    );
    assert.equal(events.length, 1);
    assert.equal(events[0].params.interaction_type, "sort_change");
    assert.equal(events[0].params.filter_value, "price-asc");
    assert.equal(navigations.at(-1)[1].scroll, false);
    assert.ok(!JSON.stringify(events).includes(filters.q));
  },
);
check(
  "Rental changes, submit, sort and reset use safe tokens once without delegated-submit duplication",
  () => {
    const rental = harness("components/pages/RentalBrowser.tsx");
    const field = (id) => find(rental.render(), (n) => n.props.id === id);
    const submit = () => find(rental.render(), (n) => n.type === "form");
    assert.equal(submit().props["data-analytics-search"], undefined);
    field("rent-location").props.onChange("New Town");
    field("rent-location").props.onChange("New Town");
    assert.equal(events.length, 1);
    assert.equal(events[0].params.filter_value, "new-town");
    field("rent-budget").props.onChange("50000");
    field("rent-furnishing").props.onChange("Furnished");
    submit().props.onSubmit({ preventDefault() {} });
    assert.equal(events.length, 4);
    assert.deepEqual(events[3].params, {
      component_name: "rent_search",
      transaction_type: "rent",
      interaction_type: "submit",
      search_term_present: false,
    });
    field("rent-sort").props.onChange("price-low");
    field("rent-sort").props.onChange("price-low");
    assert.equal(events.length, 5);
    const reset = () =>
      find(
        rental.render(),
        (n) => typeof n.props.onReset === "function",
      ).props.onReset();
    reset();
    reset();
    assert.equal(events.length, 6);
    assert.equal(events[5].params.interaction_type, "reset");
    assert.ok(
      events.every(
        (event) => !Object.values(event.params).includes("New Town"),
      ),
    );
  },
);
fs.writeFileSync(
  path.join(__dirname, "search-verification.json"),
  JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      checks,
      scope:
        "Actual components with isolated React state/event and tracker adapters. No GA network, live CRM or native browser interaction verified.",
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Passed ${checks.length} search/filter component checks; no network requests sent.`,
);
