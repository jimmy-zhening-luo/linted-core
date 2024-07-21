import scopes from "./scopes.js";
import options from "./options.js";
import type IConfig from "./interface/IConfig.js";
import type { Scopes } from "./scopes.js";
import type Plugins from "./plugins.js";
import type Parsers from "./parsers.js";
import type Ruleset from "./ruleset/Ruleset.js";

export { default as Ruleset } from "./ruleset/Ruleset.js";
export { Rule } from "./ruleset/Ruleset.js";
export type { Scopes } from "./scopes.js";
export type { default as IConfig } from "./interface/IConfig.js";
export default function (
  plugins: Plugins,
  parsers: Parsers,
  defaults: Record<Scopes, string[]>,
  includes: Particord<Scopes, string[]>,
  rulesets: { [S in Scopes]: Ruleset<S> },
  overrides: Particord<Scopes, IRule>,
): IConfig[] {
  try {
    for (const scope of scopes)
      rulesets[scope].override(overrides[scope]);

    const instantiatedOptions: {
      [S in Scopes]: InstanceType<
        typeof options[S]
      >["body"]
    } = {
      js: new options
        .js(
          plugins.js,
          ...defaults.js,
          ...includes.js ?? [],
        )
        .body,
      ts: new options
        .ts(
          plugins.ts,
          parsers.ts,
          ...defaults.ts,
          ...includes.ts ?? [],
        )
        .body,
      svelte: new options
        .svelte(
          plugins.svelte,
          parsers.svelte,
          parsers.ts,
          ...defaults.svelte,
          ...includes.svelte ?? [],
        )
        .body,
      html: new options
        .html(
          plugins.html,
          parsers.html,
          ...defaults.html,
          ...includes.html ?? [],
        )
        .body,
      json: new options
        .json(
          plugins.json,
          parsers.json,
          ...defaults.json,
          ...includes.json ?? [],
        )
        .body,
      jsonc: new options
        .jsonc(
          plugins.jsonc,
          parsers.jsonc,
          ...defaults.jsonc,
          ...includes.jsonc ?? [],
        )
        .body,
      yml: new options
        .yml(
          plugins.yml,
          parsers.yml,
          ...defaults.yml,
          ...includes.yml ?? [],
        )
        .body,
    };

    return scopes
      .map(
        scope =>
          instantiatedOptions[scope].files.length > 0
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
