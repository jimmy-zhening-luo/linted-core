import "chai/register-should.js";
import Core from ".";
import MOCK_INPUT from "./index.input.spec";

const [scopes] = MOCK_INPUT,
configs = Core(...MOCK_INPUT);

describe(
  "Core",
  function () {
    describe(
      "shape",
      function () {
        it(
          "is a function",
          function () {
            Core
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
          `length >= (plugins + global/ignores + global/settings + ${scopes.length} scopes = ${scopes.length + 3}) [Actual: ${configs.length}]`,
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
                "linted/*/plugins",
              );
            first
              .should.have
              .property("plugins")
              .an("object");
          },
        );
        it(
          "followed by global ignores",
          function () {
            second
              .should.have
              .property(
                "name",
                "linted/*/ignores",
              );
            second
              .should.have
              .property("ignores")
              .an("array");
          },
        );
      },
    );
  },
);
