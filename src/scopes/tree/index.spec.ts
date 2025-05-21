import { expect } from "chai";
import { tree } from ".";

const nodes = tree.map(([scope]) => scope);

describe("Scope Tree", function () {
  describe("shape", function () {
    it("is an array", function () {
      expect(tree)
        .an("array");
    });
  });
  describe("members", function () {
    it("are unique", function () {
      expect(tree.length)
        .equals(new Set(nodes).size);
    });
    it("omit `js`", function () {
      expect(nodes)
        .to.not.include.members(["js"]);
    });
  });
  describe("order", function () {
    it("`jsonc` < [`json`]?", function () {
      expect(nodes)
        .includes.members(["jsonc"]);
      expect(nodes.indexOf("jsonc"))
        .lessThan(-nodes.indexOf("json") * tree.length);
    });
    it("`mocha` < `ts`", function () {
      expect(nodes)
        .includes.members(["mocha", "ts"]);
      expect(nodes.indexOf("mocha"))
        .lessThan(nodes.indexOf("ts"));
    });
    it("`svelte` < `ts`", function () {
      expect(nodes).includes.members(["svelte", "ts"]);
      expect(nodes.indexOf("svelte"))
        .lessThan(nodes.indexOf("ts"));
    });
    it("`ts` is last", function () {
      expect(nodes)
        .includes.members(["ts"]);
      expect(nodes.indexOf("ts"))
        .equals(tree.length - 1);
    });
  });
});
