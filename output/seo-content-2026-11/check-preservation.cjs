const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const cp = require("node:child_process");
const ts = require("typescript");
const printer = ts.createPrinter({ removeComments: true });

const root = path.resolve(__dirname, "../..");
const baseline = "9c6bedc";
const git = (...args) => cp.execFileSync("git", args, { cwd: root, encoding: "utf8" });
const changed = git("diff", "--name-only", baseline).trim().split("\n").filter(Boolean);
assert.ok(!changed.some(file => /\.(css|woff2?|png|jpe?g|webp|svg)$/i.test(file)), "Styles/fonts/images are unchanged");
assert.ok(!changed.some(file => /^(public\/|components\/(auth|analytics|providers|property)\/|lib\/(analytics|consent|api|auth|enquiry|website-properties))/.test(file)), "Assets, auth, analytics, enquiry and listing adapters are unchanged");
assert.ok(!changed.some(file => /Testimonial|client-stories|useHeroRotation|HeroSlideshow|NavigationLoader/.test(file)), "Approved motion and testimonials are unchanged");

function ast(file, text) {
  return ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}
function visualShape(file, text) {
  const source = ast(file, text);
  const shape = [];
  const visit = node => {
    if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(source) === "JsonLd") return;
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const attributes = node.attributes.properties.flatMap(attr => {
        if (ts.isJsxAttribute(attr) && ["alt", "title", "copy", "aria-label"].includes(attr.name.getText(source))) return [];
        if (node.tagName.getText(source) === "PageFAQ" && ts.isJsxAttribute(attr) && attr.name.getText(source) === "items") {
          const expression = attr.initializer?.expression;
          if (expression && ts.isArrayLiteralExpression(expression)) return [`items: ${expression.elements.length} existing questions`];
        }
        return [printer.printNode(ts.EmitHint.Unspecified, attr, source)];
      });
      shape.push({ tag: node.tagName.getText(source), attributes });
    }
    if (ts.isJsxClosingElement(node)) shape.push({ close: node.tagName.getText(source) });
    ts.forEachChild(node, visit);
  };
  visit(source);
  return shape;
}
const checked = [];
for (const file of changed.filter(file => file.endsWith(".tsx"))) {
  const before = git("show", `${baseline}:${file}`);
  const after = fs.readFileSync(path.join(root, file), "utf8");
  assert.deepEqual(visualShape(file, after), visualShape(file, before), `${file}: visual JSX, styling, image and action props`);
  checked.push(file);
}
function legalCopy(file, text) {
  const source = ast(file, text);
  const values = [];
  const visit = node => {
    if (ts.isJsxText(node) && node.text.trim()) values.push(node.text.replace(/\s+/g, " ").trim());
    if (ts.isJsxAttribute(node) && node.name.getText(source) === "updated") values.push(node.initializer.getText(source));
    ts.forEachChild(node, visit);
  };
  visit(source);
  return values;
}
for (const file of ["app/privacy/page.tsx", "app/terms-and-conditions/page.tsx"]) {
  assert.deepEqual(legalCopy(file, fs.readFileSync(path.join(root, file), "utf8")), legalCopy(file, git("show", `${baseline}:${file}`)), `${file}: legal prose and update date`);
}
const hero = fs.readFileSync(path.join(root, "components/home/HeroCopy.tsx"), "utf8");
for (const text of ["Homes That Match", "Your Pace,", "Not Just Your Budget."]) assert.ok(hero.includes(text));
const result = {
  baseline,
  passed: true,
  checks: ["No style, asset or font edits", "No auth, form, API, analytics or motion changes", "Visual JSX structure and image/action/style props preserved", "Legal prose and dates preserved", "Exact Home hero tagline preserved"],
  jsxFilesChecked: checked,
  limits: "Source invariants supplement local screenshots; edited text can naturally wrap differently. No pixel-identity or production-field claim."
};
fs.writeFileSync(path.join(__dirname, "ui-preservation.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
