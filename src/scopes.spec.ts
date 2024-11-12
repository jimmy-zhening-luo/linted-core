import { expect } from "chai";
import { scopes } from ".";

describe("Scopes", function () {
  describe("shape", function () {
    it("is a non-empty array", function () {
      expect(scopes)
        .an("array")
        .with.lengthOf.at.least(1);
    });
  });
  describe("order", function () {
    it("jsonc > json", function () {
      expect(scopes)
        .includes.members(["jsonc", "json"]);
      expect(scopes.indexOf("jsonc"))
        .greaterThan(scopes.indexOf("json"));
    });
    it("ts > js", function () {
      expect(scopes)
        .includes.members(["ts", "js"]);
      expect(scopes.indexOf("ts"))
        .greaterThan(scopes.indexOf("js"));
    });
    it("mocha > ts", function () {
      expect(scopes)
        .includes.members(["mocha", "ts"]);
      expect(scopes.indexOf("mocha"))
        .greaterThan(scopes.indexOf("ts"));
    });
    it("svelte > ts", function () {
      expect(scopes).includes.members(["svelte", "ts"]);
      expect(scopes.indexOf("svelte"))
        .greaterThan(scopes.indexOf("ts"));
    });
  });
});
