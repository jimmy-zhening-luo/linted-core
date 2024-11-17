import { expect } from "chai";
import core from ".";
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
        .lengthOf.at.least(1);
    });
  });
  describe("TBD: configs", function () {
    it("have first three common", function () {
      expect(configs[0])
        .to.be.an("object");
    });
  });
});
