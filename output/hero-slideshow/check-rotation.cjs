// Isolated hook regression check: executes the real hook with deterministic
// state/effect and clock adapters. This does not replace a browser UI check.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

const source = ts.transpileModule(
  fs.readFileSync("components/home/useHeroRotation.ts", "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;

const slides = loadComponent("components/home/hero-slides.ts", {});
const slideCount = slides.HERO_SLIDES.length;

function mount() {
  const states = [],
    effects = [],
    pending = [],
    timers = new Map();
  let cursor = 0,
    now = 0,
    id = 0,
    observer,
    rotation;
  let ready = true,
    count = slideCount,
    reduced = false,
    visible = true;
  const hero = { current: {} };
  const hooks = {
    useState(initial) {
      const slot = cursor++;
      if (!(slot in states)) states[slot] = initial;
      return [
        states[slot],
        (value) => {
          states[slot] =
            typeof value === "function" ? value(states[slot]) : value;
        },
      ];
    },
    useSyncExternalStore(_subscribe, snapshot) {
      return snapshot();
    },
    useEffect(callback, deps) {
      const slot = cursor++;
      const previous = effects[slot];
      if (
        !previous ||
        deps.some((value, index) => !Object.is(value, previous.deps[index]))
      ) {
        pending.push(() => {
          previous?.cleanup?.();
          effects[slot] = { deps, cleanup: callback() };
        });
      }
    },
  };
  const exported = {};
  vm.runInNewContext(source, {
    exports: exported,
    require: (name) => {
      assert.equal(name, "react");
      return hooks;
    },
    window: {
      matchMedia: () => ({ matches: reduced }),
      setTimeout: (callback, delay) => {
        timers.set(++id, { callback, at: now + delay });
        return id;
      },
      clearTimeout: (key) => timers.delete(key),
    },
    document: {
      get visibilityState() {
        return visible ? "visible" : "hidden";
      },
    },
    IntersectionObserver: class {
      constructor(callback) {
        observer = callback;
      }
      observe() {}
      disconnect() {}
    },
  });
  function render() {
    cursor = 0;
    rotation = exported.default(hero, ready, count);
    while (pending.length) pending.shift()();
  }
  render();
  return {
    get state() {
      return rotation;
    },
    get timerCount() {
      return timers.size;
    },
    act(callback) {
      callback(rotation);
      render();
    },
    advance(ms) {
      const end = now + ms;
      while (true) {
        const next = [...timers].sort((a, b) => a[1].at - b[1].at)[0];
        if (!next || next[1].at > end) break;
        now = next[1].at;
        timers.delete(next[0]);
        next[1].callback();
        render();
      }
      now = end;
    },
    options(values) {
      if ("ready" in values) ready = values.ready;
      if ("count" in values) count = values.count;
      if ("reduced" in values) reduced = values.reduced;
      if ("visible" in values) visible = values.visible;
      render();
    },
    intersection(ratio) {
      observer([{ isIntersecting: ratio > 0, intersectionRatio: ratio }]);
      render();
    },
    unmount() {
      effects.forEach((effect) => effect?.cleanup?.());
    },
  };
}

const autoplay = mount();
autoplay.advance(4499);
assert.equal(autoplay.state.active, 0);
autoplay.advance(1);
assert.equal(autoplay.state.active, 1);
for (let step = 2; step <= slideCount; step++) {
  const expected = step % slideCount;
  autoplay.advance(4500);
  assert.equal(autoplay.state.active, expected);
}
autoplay.advance(4500 * slideCount * 10);
assert.equal(autoplay.state.active, 0);
assert.equal(autoplay.timerCount, 1);
assert.equal("toggle" in autoplay.state, false);
autoplay.unmount();
assert.equal(autoplay.timerCount, 0);

const interaction = mount();
interaction.act((rotation) => rotation.setFocused(true));
interaction.advance(20000);
assert.equal(interaction.state.active, 0);
assert.equal(interaction.timerCount, 0);
interaction.act((rotation) => rotation.setFocused(false));
interaction.advance(4500);
assert.equal(interaction.state.active, 1);
interaction.advance(3000);
interaction.act((rotation) => rotation.select(1));
interaction.advance(4499);
assert.equal(interaction.state.active, 1);
interaction.advance(1);
assert.equal(interaction.state.active, 2);
interaction.act((rotation) => rotation.select(slideCount - 1));
interaction.advance(4500);
assert.equal(interaction.state.active, 0);
interaction.act((rotation) => rotation.setFocused(true));
interaction.act((rotation) => rotation.select(2));
interaction.advance(4500);
assert.equal(interaction.state.active, 3);
interaction.unmount();

const environment = mount();
for (const blocked of [
  { ready: false },
  { reduced: true },
  { visible: false },
  { count: 1 },
]) {
  environment.options(blocked);
  environment.advance(20000);
  assert.equal(environment.state.active, 0);
  assert.equal(environment.timerCount, 0);
  environment.options({
    ready: true,
    reduced: false,
    visible: true,
    count: slideCount,
  });
}
environment.intersection(0.1);
environment.advance(20000);
assert.equal(environment.state.active, 0);
environment.intersection(1);
environment.advance(4500);
assert.equal(environment.state.active, 1);
environment.options({ reduced: true });
environment.act((rotation) => rotation.select(slideCount - 1));
environment.advance(20000);
assert.equal(environment.state.active, slideCount - 1);
environment.unmount();
assert.equal(environment.timerCount, 0);

// Execute actual selector rendering, not a source-string assertion.
function loadComponent(file, dependencies) {
  const compiled = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require: (name) => {
      if (name in dependencies) return dependencies[name];
      return require(name);
    },
  });
  return exports;
}
assert.equal(slideCount, 5);
for (const slide of slides.HERO_SLIDES)
  assert.ok(fs.existsSync(`public${slide.src}`));
const Controls = loadComponent("components/home/HeroSlideControls.tsx", {
  "./hero-slides": slides,
  "./HeroSlideshow.module.css": { default: {} },
}).default;
const React = require("react");
const html = require("react-dom/server").renderToStaticMarkup(
  React.createElement(Controls, { active: 2, onSelect() {} }),
);
assert.equal((html.match(/<button/g) || []).length, slideCount);
assert.equal((html.match(/aria-pressed="true"/g) || []).length, 1);
assert.ok(html.includes("Show kolkata neighbourhood streets"));
assert.ok(html.includes("Show new town lakeside homes"));
assert.ok(html.includes("Show kolkata riverside homes"));
assert.equal(/pause|play hero|rotation-toggle/i.test(html), false);
console.log(
  "PASS: five-slide repeated cycles/wrap, focus resume, manual/same-image reset, readiness, reduced motion/manual control, visibility, viewport threshold, timer cleanup; five labelled selectors without Pause/Play and all local assets. Isolated hook/render checks, not a browser animation test.",
);
