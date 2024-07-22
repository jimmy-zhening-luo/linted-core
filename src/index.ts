import scopes from "./module/index.js";
import {
  options,
  Files,
  Ruleset,
  Rule,
} from "./factory/index.js";
import type {
  Scope,
  Plugins,
  Parsers,
} from "./module/index.js";
import type Config from "./config/index.js";

export { Ruleset, Rule };
export type { Scope };
export default function (
  plugins: Plugins,
  parsers: Parsers,
  base: Record<Scope, string[]>,
  includes: Particord<Scope, string[]>,
  rulesets: { [S in Scope]: Ruleset<S> },
  overrides: Particord<Scope, IRule>,
): Config[] {
  try {
    for (const scope of scopes)
      rulesets[scope].override(overrides[scope]);

    const instantiatedOptions: {
      [S in Scope]: InstanceType<
        typeof options[S]
      >["body"]
    } = {
      js: new options
        .js(
          plugins.js,
          new Files(
            "js",
            { base, includes },
          ).files,

        )
        .body,
      ts: new options
        .ts(
          plugins.ts,
          parsers.ts,
          new Files(
            "ts",
            { base, includes },
          ).files,
        )
        .body,
      svelte: new options
        .svelte(
          plugins.svelte,
          parsers.svelte,
          parsers.ts,
          new Files(
            "svelte",
            { base, includes },
          ).files,
        )
        .body,
      html: new options
        .html(
          plugins.html,
          parsers.html,
          new Files(
            "html",
            { base, includes },
          ).files,
        )
        .body,
      json: new options
        .json(
          plugins.json,
          parsers.json,
          new Files(
            "json",
            { base, includes },
          ).files,
        )
        .body,
      jsonc: new options
        .jsonc(
          plugins.jsonc,
          parsers.jsonc,
          new Files(
            "jsonc",
            { base, includes },
          ).files,
        )
        .body,
      yml: new options
        .yml(
          plugins.yml,
          parsers.yml,
          new Files(
            "yml",
            { base, includes },
          ).files,
        )
        .body,
    };

    return scopes
      .map(
        scope => instantiatedOptions[scope].files.length > 0
          ? rulesets[scope]
            .flat
            .map(
              rules => {
                return {
                  rules,
                  ...instantiatedOptions[scope],
                };
              },
            )
          : [],
      )
      .flat();
  }
  catch (e) {
    throw new Error(
      `linted(): Caught exception.`,
      { cause: e },
    );
  }
}
