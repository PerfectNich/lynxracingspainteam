import { test } from "node:test";
import assert from "node:assert/strict";
import { validateResults } from "./validate-results.mjs";

const result = { id: "daytona", event: "Daytona 24", year: 2026, simulator: "iRacing", car: "lmp2", pos: 3, drivers: ["Marc Garcia"], featured: true };
test("accepts a result and preserves historical driver names", () => {
  assert.deepEqual(validateResults([{ ...result, drivers: ["Former driver"] }], ["lmp2"]), []);
});
test("rejects duplicate IDs and multiple featured results", () => {
  const errors = validateResults([result, result], ["lmp2"]);
  assert.ok(errors.some((error) => error.includes("ID")));
  assert.ok(errors.some((error) => error.includes("destacado")));
});
test("rejects invalid positions, unavailable cars and empty lineups", () => {
  const errors = validateResults([{ ...result, pos: 0, car: "missing", drivers: [] }], ["lmp2"]);
  assert.equal(errors.length, 3);
});
test("rejects duplicate pilots even when accents differ", () => {
  assert.ok(validateResults([{ ...result, drivers: ["Rubén Juarez", "Ruben Juarez"] }], ["lmp2"]).some((error) => error.includes("duplicados")));
});
test("handles malformed data without throwing", () => {
  assert.ok(validateResults(null, []).length);
  assert.ok(validateResults([null], []).length);
});
test("rejects duplicate pilots with repeated spaces", () => {
  assert.ok(validateResults([{ ...result, drivers: ["Marc Garcia", " Marc  Garcia "] }], ["lmp2"]).some((error) => error.includes("duplicados")));
});
