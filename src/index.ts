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
  files: Record<
    | "defaults"
    | "includes"
    ,
    Record<Scopes, string[]>
  >,
  rulesets: { [S in Scopes]: Ruleset<S> },
): IConfig[] {
  try {
    const instantiatedOptions: {
      [S in Scopes]: InstanceType<
        typeof options[S]
      >["body"]
    } = {
      js: new options
        .js(
          plugins.js,
          ...files.defaults.js,
          ...files.includes.js,
        )
        .body,
      ts: new options
        .ts(
          plugins.ts,
          parsers.ts,
          ...files.defaults.ts,
          ...files.includes.ts,
        )
        .body,
      svelte: new options
        .svelte(
          plugins.svelte,
          parsers.svelte,
          parsers.ts,
          ...files.defaults.svelte,
          ...files.includes.svelte,
        )
        .body,
      html: new options
        .html(
          plugins.html,
          parsers.html,
          ...files.defaults.html,
          ...files.includes.html,
        )
        .body,
      json: new options
        .json(
          plugins.json,
          parsers.json,
          ...files.defaults.json,
          ...files.includes.json,
        )
        .body,
      jsonc: new options
        .jsonc(
          plugins.jsonc,
          parsers.jsonc,
          ...files.defaults.jsonc,
          ...files.includes.jsonc,
        )
        .body,
      yml: new options
        .yml(
          plugins.yml,
          parsers.yml,
          ...files.defaults.yml,
          ...files.includes.yml,
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
