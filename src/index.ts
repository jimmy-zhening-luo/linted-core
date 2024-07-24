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
    ),
          imports: {
            [S in Scope]: OmitFirst<ConstructorParameters<typeof Options[S]>>;
          } = {
            js: [plugins.js, []] as const,
            ts: [plugins.ts, [parsers.ts]] as const,
            svelte: [
              plugins.svelte,
              [parsers.svelte, parsers.ts],
            ] as const,
            html: [plugins.html, [parsers.html]] as const,
            json: [plugins.json, [parsers.json]] as const,
            jsonc: [plugins.jsonc, [parsers.jsonc]] as const,
            yml: [plugins.yml, [parsers.yml]] as const,
          } as const;

    for (const scope of scopes)
      rulesets[scope].override(overrides[scope]);

    const options: {
      [S in Scope]: InstanceType<
        typeof Options[S]
      >["option"]
    } = {
      js: new Options
        .js(
          files.files("js"),
          ...imports.js,
        )
        .option,
      ts: new Options
        .ts(
          files.files("ts"),
          ...imports.ts,
        )
        .option,
      svelte: new Options
        .svelte(
          files.files("svelte"),
          ...imports.svelte,
        )
        .option,
      html: new Options
        .html(
          files.files("html"),
          ...imports.html,
        )
        .option,
      json: new Options
        .json(
          files.files("json"),
          ...imports.json,
        )
        .option,
      jsonc: new Options
        .jsonc(
          files.files("jsonc"),
          ...imports.jsonc,
        )
        .option,
      yml: new Options
        .yml(
          files.files("yml"),
          ...imports.yml,
        )
        .option,
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
