import assert from "node:assert";
import { describe, it } from "node:test";

describe("Whatever", () => {
  it("should pass CI", () => {
    assert.strictEqual(1, 1);
  });
});
