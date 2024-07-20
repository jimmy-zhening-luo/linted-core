import scopes from "./scopes.js";
import options from "./options.js";
import type { Scopes } from "./scopes.js";
import type Plugins from "./plugins.js";
import type Parsers from "./parsers.js";
import type Ruleset from "./rulesets/ruleset/Ruleset.js";

export { default as Ruleset } from "./rulesets/ruleset/Ruleset.js";
export { Rule } from "./rulesets/ruleset/Ruleset.js";
export default function (
  plugins: Plugins,
  parsers: Parsers,
  files: Record<Scopes, string[]>,
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
          plugins
            .js,
          ...files
            .js,
        )
        .body,
      ts: new options
        .ts(
          plugins
            .ts,
          parsers
            .ts,
          ...files
            .ts,
        )
        .body,
      svelte: new options
        .svelte(
          plugins
            .svelte,
          parsers
            .svelte,
          parsers
            .ts,
          ...files
            .svelte,
        )
        .body,
      html: new options
        .html(
          plugins
            .html,
          parsers
            .html,
          ...files
            .html,
        )
        .body,
      json: new options
        .json(
          plugins
            .json,
          parsers
            .json,
          ...files
            .json,
        )
        .body,
      jsonc: new options
        .jsonc(
          plugins
            .jsonc,
          parsers
            .jsonc,
          ...files
            .jsonc,
        )
        .body,
      yml: new options
        .yml(
          plugins
            .yml,
          parsers
            .yml,
          ...files
            .yml,
        )
        .body,
    };

    return scopes
      .map(
        scope =>
          instantiatedOptions[scope].files.length > 0
            ? rulesets[scope].flat.map(
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
