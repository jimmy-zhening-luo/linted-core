import "chai/register-should.js";
import core from ".";
import { scopes } from "./scopes";
import { TestInput } from "./_test/input";

const configs = core(TestInput);

describe(
  "Core",
  function () {
    describe(
      "shape",
      function () {
        it(
          "is a function",
          function () {
            core
              .should.be
              .a("function");
          },
        );
      },
    );
    describe(
      "output",
      function () {
        it(
          "is a non-empty array",
          function () {
            configs
              .should.be
              .an("array")
              .not.empty;
          },
        );
        it(
          `with length >= plugins + */ignores + */settings + ${scopes.length} scopes = ${scopes.length + 3}  [Actual: ${configs.length}`,
          function () {
            configs
              .should.have
              .lengthOf.above(scopes.length + 2);
          },
        );
        it(
          "containing only config-like members",
          function () {
            configs
              .should
              .satisfy((configs: unknown[]) => configs
                .every(config => typeof config === "object"
                  && config !== null
                  && "name" in config
                  && typeof config.name === "string"));
          },
        );
      },
    );
    describe(
      "configs",
      function () {
        const [
          first,
          second,
        ] = configs as [object, object];

        it(
          "begin with plugins",
          function () {
            first
              .should.have
              .property(
                "name",
                "linted/*/plugins/",
              );
            first
              .should.have
              .property("plugins")
              .an("object");
          },
        );
        it(
          "followed by global settings",
          function () {
            second
              .should.have
              .property(
                "name",
                "linted/*/settings/",
              );
            second
              .should.have
              .property("linterOptions")
              .an("object");
            second
              .should.have
              .nested.property("languageOptions.sourceType")
              .a("string");
            second
              .should.have
              .nested.property("languageOptions.ecmaVersion");
          },
        );
      },
    );
  },
);
