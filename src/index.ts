import scopes from "./boundary/boundary.js";
import type {
  Scope,
  Plugins,
  Parsers,
  Config,
} from "./boundary/boundary.js";
import {
  Options,
  Files,
  Ruleset,
  Rule,
} from "./factory/Factory.js";

export type { Scope };
export { Ruleset, Rule };
export default function (
  plugins: Plugins,
  parsers: Parsers,
  base: Record<Scope, string[]>,
  includes: Particord<Scope, string[]>,
  rulesets: { [S in Scope]: Ruleset<S> },
  overrides: Particord<Scope, IRule>,
): Config[] {
  try {
    const files = new Files(
      base,
      includes,
    );

    for (const scope of scopes)
      rulesets[scope].override(overrides[scope]);

    const options: {
      [S in Scope]: InstanceType<
        typeof Options[S]
      >["body"]
    } = {
      js: new Options
        .js(
          plugins.js,
          files.files("js"),
        )
        .body,
      ts: new Options
        .ts(
          plugins.ts,
          parsers.ts,
          files.files("ts"),
        )
        .body,
      svelte: new Options
        .svelte(
          plugins.svelte,
          parsers.svelte,
          parsers.ts,
          files.files("svelte"),
        )
        .body,
      html: new Options
        .html(
          plugins.html,
          parsers.html,
          files.files("html"),
        )
        .body,
      json: new Options
        .json(
          plugins.json,
          parsers.json,
          files.files("json"),
        )
        .body,
      jsonc: new Options
        .jsonc(
          plugins.jsonc,
          parsers.jsonc,
          files.files("jsonc"),
        )
        .body,
      yml: new Options
        .yml(
          plugins.yml,
          parsers.yml,
          files.files("yml"),
        )
        .body,
    };

    return scopes
      .map(
        scope => options[scope].files.length > 0
          ? rulesets[scope]
            .flat
            .map(
              rules => {
                return {
                  rules,
                  ...options[scope],
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
