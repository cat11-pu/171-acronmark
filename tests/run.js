import assert from "node:assert";
import { isAcronym } from "../check.js";
import { markAcronyms } from "../mark.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("isAcronym returns a boolean", () => {
  assert.strictEqual(typeof isAcronym("HTTP", 2), "boolean");
});

check("markAcronyms returns spots", () => {
  assert.ok(Array.isArray(markAcronyms(["HTTP"], 2).spots));
});

check("markAcronyms returns longest", () => {
  assert.strictEqual(typeof markAcronyms(["HTTP"], 2).longest, "number");
});

check("render counts spots", () => {
  assert.strictEqual(typeof render({ words: ["A"], min_length: 1 }).count, "number");
});

check("render exposes first", () => {
  assert.strictEqual(typeof render({ words: ["A"], min_length: 1 }).first, "string");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
