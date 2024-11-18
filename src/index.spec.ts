import { expect } from "chai";
import core from ".";
import { scopes } from "./scopes";
import { TestInput } from "./test/input";

const configs = core(TestInput);

describe("Core", function () {
  describe("shape", function () {
    it("is a function", function () {
      expect(core)
        .a("function");
    });
  });
  describe("output", function () {
    it("is an array", function () {
      expect(configs)
        .an("array");
    });
    it("is non-empty", function () {
      expect(configs)
        .not.empty;
    });
    it(`has length >= common ignores + common settings + ${scopes.length} scopes = ${scopes.length + 2}  [Actual: ${configs.length}`, function () {
      expect(configs)
        .lengthOf.at.least(scopes.length + 2);
    });
    it("has only config-like members", function () {
      expect(configs)
        .satisfies(function (configs: readonly object[]) {
          return configs.every(config => typeof config === "object" && config !== null && "name" in config && typeof config.name === "string")
        });
    });
  });
  describe("configs", function () {
    it("begin with common settings", function () {
      expect(configs[0])
        .has.property("name", "linted/*/")
        .property("linterOptions")
        .nested.property("languageOptions.sourceType")
        .and.nested.property("languageOptions.ecmaVersion");
    });
  });
});
