import "chai/register-should.js";
import Core from "../dist";
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
      "module",
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
          "of config objects",
          function () {
            for (const config of configs)
              config
                .should.be
                .an("object")
                .includes
                .any
                .keys(
                  "plugins",
                  "files",
                  "ignores",
                  "rules",
                );
          },
        );
        it(
          "with valid plugins",
          function () {
            for (const config of configs)
              if ("plugins" in config)
                (config.plugins as object)
                  .should.be
                  .an("object");
          },
        );
        it(
          "or valid files",
          function () {
            for (const config of configs)
              if ("files" in config)
                config
                  .files
                  .should.be
                  .an("array")
                  .not.empty;
          },
        );
        it(
          "or valid ignores",
          function () {
            for (const config of configs)
              if ("ignores" in config) {
                config
                  .ignores
                  .should.be
                  .an("array");

                for (const pattern of config.ignores)
                  pattern
                    .should.be
                    .a("string")
                    .not.empty;
              }
          },
        );
        it(
          "or valid rules",
          function () {
            for (const config of configs)
              if ("rules" in config) {
                config
                  .rules
                  .should.be
                  .an("object")
                  .not.empty;

                for (const rule of Object.keys(config.rules)) {
                  rule
                    .should
                    .be
                    .a("string");

                  if (typeof config.rules[rule] !== "number")
                    config.rules[rule]!
                      .should
                      .be
                      .an("array")
                      .with
                      .property("0")
                      .a("number");
                }
              }
          },
        );
      },
    );
  },
);
