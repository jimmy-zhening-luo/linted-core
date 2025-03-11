import { expect } from "chai";
import core from ".";
import { scopes } from "./scopes";
import { TestInput } from "./index.input.spec";

const configs = core(TestInput);

describe("Core", function () {
  describe("shape", function () {
    it("is a function", function () {
      expect(core)
        .a("function");
    });
  });
  describe("output", function () {
    it("is a non-empty array", function () {
      expect(configs)
        .an("array")
        .not.empty;
    });
    it(`with length >= plugins + */ignores + */settings + ${scopes.length} scopes = ${scopes.length + 3}  [Actual: ${configs.length}`, function () {
      expect(configs)
        .lengthOf.above(scopes.length + 2);
    });
    it("containing only config-like members", function () {
      expect(configs)
        .satisfies((configs: readonly unknown[]) => configs.every(config => typeof config === "object" && config !== null && "name" in config && typeof config.name === "string"));
    });
  });
  describe("configs", function () {
    it("begin with plugins", function () {
      expect(configs[0])
        .has.property("name", "plugins");
      expect(configs[0])
        .has.property("plugins")
        .an("object");
    });
    it("begin with common settings", function () {
      expect(configs[1])
        .has.property("name", "linted/*/");
      expect(configs[1])
        .has.property("linterOptions")
        .an("object");
      expect(configs[1])
        .has.nested.property("languageOptions.sourceType")
        .a("string");
      expect(configs[1])
        .has.nested.property("languageOptions.ecmaVersion");
    });
  });
});
