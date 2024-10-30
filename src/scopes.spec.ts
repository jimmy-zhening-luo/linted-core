import { expect } from "chai";
import { scopes } from "./scopes";

describe("Scopes", function () {
  describe("shape", function () {
    it("is a non-empty array", function () {
      expect(scopes)
        .to.be.an("array")
        .that.has.lengthOf.at.least(1);
    });
  });
  describe("order", function () {
    it("jsonc > json", function () {
      expect(scopes.indexOf("jsonc"))
        .greaterThan(scopes.indexOf("json"));
    });
    it("ts > js", function () {
      expect(scopes.indexOf("ts"))
        .greaterThan(scopes.indexOf("js"));
    });
    it("mocha > ts", function () {
      expect(scopes.indexOf("mocha"))
        .greaterThan(scopes.indexOf("ts"));
    });
    it("svelte > ts", function () {
      expect(scopes.indexOf("svelte"))
        .greaterThan(scopes.indexOf("ts"));
    });
  });
});
