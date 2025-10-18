import "chai/register-should.js";
import Core from ".";
import {
  scopes,
  optional,
  tree,
  imports,
  settings,
  configuration,
} from "./index.input.spec";

const configs = Core(
  scopes,
  optional,
  tree,
  imports,
  settings,
  configuration,
);

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
          `length >= (global/ignores + ${scopes.length} scopes = ${scopes.length + 1}) [Actual: ${configs.length}]`,
          function () {
            configs
              .should.have
              .lengthOf.above(scopes.length + 1);
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
        const global = configs.at(-1) as [object];

        it(
          "ends with global ignores",
          function () {
            global
              .should.have
              .property(
                "name",
                "linted/*/ignores",
              );
            global
              .should.have
              .property("ignores")
              .an("array");
          },
        );
      },
    );
  },
);
