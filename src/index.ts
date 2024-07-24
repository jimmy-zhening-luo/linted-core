import scopes from "./boundary/boundary.js";
import type {
  Scope,
  Plugins,
  Parsers,
  IConfig,
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
): IConfig[] {
  try {
    const files = new Files(
      base,
      includes,
    ),
    imports: {
      [S in Scope]: OmitFilesRuleset<ConstructorParameters<typeof Options[S]>>;
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
      >["configs"]
    } = {
      js: new Options
        .js(
          files.files("js"),
          rulesets.js,
          ...imports.js,
        )
        .configs,
      ts: new Options
        .ts(
          files.files("ts"),
          rulesets.ts,
          ...imports.ts,
        )
        .configs,
      svelte: new Options
        .svelte(
          files.files("svelte"),
          rulesets.svelte,
          ...imports.svelte,
        )
        .configs,
      html: new Options
        .html(
          files.files("html"),
          rulesets.html,
          ...imports.html,
        )
        .configs,
      json: new Options
        .json(
          files.files("json"),
          rulesets.json,
          ...imports.json,
        )
        .configs,
      jsonc: new Options
        .jsonc(
          files.files("jsonc"),
          rulesets.jsonc,
          ...imports.jsonc,
        )
        .configs,
      yml: new Options
        .yml(
          files.files("yml"),
          rulesets.yml,
          ...imports.yml,
        )
        .configs,
    };

    return scopes
      .map(scope => options[scope])
      .flat();
  }
  catch (e) {
    throw new Error(
      `linted(): Caught exception.`,
      { cause: e },
    );
  }
}
