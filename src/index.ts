import scopes, { type Scope } from "./scopes/scopes.js";
import type Output from "./boundary/output/output.js";
import type Input from "./boundary/input/input.js";
import {
  Options,
  Files,
  Ruleset,
  Rule,
} from "./factory/factory.js";

export type {
  Scope,
  Input,
  Output,
};
export default function (
  plugins: Input.Plugins,
  parsers: Input.Parsers,
  base: Input.Files,
  includes: Partial<Input.Files>,
  rules: Input.Rules,
  overrides: Input.Overrides,
): Output[] {
  try {
    const files = new Files(
      base,
      includes,
    ),
    rulesets = {
      js: new Ruleset(
        "js",
        ...rules.js.map(args => new Rule(...args)),
      ),
      ts: new Ruleset(
        "ts",
        ...rules.ts.map(args => new Rule(...args)),
      ),
      svelte: new Ruleset(
        "svelte",
        ...rules.svelte.map(args => new Rule(...args)),
      ),
      html: new Ruleset(
        "html",
        ...rules.html.map(args => new Rule(...args)),
      ),
      json: new Ruleset(
        "json",
        ...rules.json.map(args => new Rule(...args)),
      ),
      jsonc: new Ruleset(
        "jsonc",
        ...rules.jsonc.map(args => new Rule(...args)),
      ),
      yml: new Ruleset(
        "yml",
        ...rules.yml.map(args => new Rule(...args)),
      ),
    },
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
      `linted.main`,
      { cause: e },
    );
  }
}
