import "chai/register-should.js";
import Core from "..";
import {
  scopes,
  optional,
  tree,
  imports,
  settings,
  defaults,
  extensions,
} from "./index.input.spec";

const GLOBAL_CONFIG_COUNT = 1,
configs = Core(
  scopes,
  optional,
  tree,
  imports,
  settings,
  defaults,
  extensions,
),
Scopes = new Set(scopes);

for (const scope of optional)
  Scopes.delete(scope);

describe(
  "Core",
  () => {
    describe(
      "module",
      () => {
        it(
          "is a function",
          () => {
            Core
              .should.be
              .a("function");
          },
        );
      },
    );
    describe(
      "output",
      () => {
        it(
          "is a non-empty array",
          () => {
            configs
              .should.be
              .an("array")
              .not.empty;
          },
        );
        it(
          `length >= (*/plugins + */ignores + ${Scopes.size} scopes = ${Scopes.size + GLOBAL_CONFIG_COUNT}) [Actual: ${configs.length}]`,
          () => {
            configs
              .should.have
              .lengthOf
              .at.least(Scopes.size + GLOBAL_CONFIG_COUNT);
          },
        );
        it(
          "of config objects",
          () => {
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
          () => {
            for (const config of configs)
              if ("plugins" in config)
                (config.plugins as object)
                  .should.be
                  .an("object");
          },
        );
        it(
          "or valid files",
          () => {
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
          () => {
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
          () => {
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
