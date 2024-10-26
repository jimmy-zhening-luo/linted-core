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
});
