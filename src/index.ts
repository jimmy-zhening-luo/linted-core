import type * as Boundary from "./boundary/boundary.js";
import scopes, { type Scope } from "./scopes/Scopes.js";
import {
  Options,
  Files,
  Ruleset,
  Rule,
} from "./factory/factory.js";

export type { Boundary };
export default function (
  plugins: Boundary.Input.Plugins,
  parsers: Boundary.Input.Parsers,
  files: {
    base: Boundary.Input.Files.Base;
    includes: Boundary.Input.Files.Includes;
  },
  rules: {
    preset: Boundary.Input.Rules.Preset;
    overrides: Boundary.Input.Rules.Overrides;
  },
): Boundary.Output[] {
  try {
    const f = new Files(
      files.base,
      files.includes,
    ),
    rulesets = {
      js: new Ruleset(
        "js",
        ...rules.preset.js.map(args => new Rule(...args)),
      ),
      ts: new Ruleset(
        "ts",
        ...rules.preset.ts.map(args => new Rule(...args)),
      ),
      svelte: new Ruleset(
        "svelte",
        ...rules.preset.svelte.map(args => new Rule(...args)),
      ),
      html: new Ruleset(
        "html",
        ...rules.preset.html.map(args => new Rule(...args)),
      ),
      json: new Ruleset(
        "json",
        ...rules.preset.json.map(args => new Rule(...args)),
      ),
      jsonc: new Ruleset(
        "jsonc",
        ...rules.preset.jsonc.map(args => new Rule(...args)),
      ),
      yml: new Ruleset(
        "yml",
        ...rules.preset.yml.map(args => new Rule(...args)),
      ),
    },
    scopedParsers: {
      [S in Scope]: ConstructorParameters<typeof Options[S]>[3];
    } = {
      js: [] as const,
      ts: [parsers.ts] as const,
      svelte: [parsers.svelte, parsers.ts] as const,
      html: [parsers.html] as const,
      json: [parsers.jsonc] as const,
      jsonc: [parsers.jsonc] as const,
      yml: [parsers.yml] as const,
    } as const;

    for (const scope of scopes)
      rulesets[scope].override(rules.overrides[scope]);

    const options: {
      [S in Scope]: InstanceType<
        typeof Options[S]
      >["configs"]
    } = {
      js: new Options
        .js(
          f.files("js"),
          rulesets.js,
          {
            "@stylistic": plugins["@stylistic"],
          },
          scopedParsers.js,
        )
        .configs,
      ts: new Options
        .ts(
          f.files("ts"),
          rulesets.ts,
          {
            "@stylistic": plugins["@stylistic"],
            "@typescript-eslint": plugins["@typescript-eslint"],
          },
          scopedParsers.ts,
        )
        .configs,
      svelte: new Options
        .svelte(
          f.files("svelte"),
          rulesets.svelte,
          {
            "@stylistic": plugins["@stylistic"],
            "@typescript-eslint": plugins["@typescript-eslint"],
            svelte: plugins.svelte,
          },
          scopedParsers.svelte,
        )
        .configs,
      html: new Options
        .html(
          f.files("html"),
          rulesets.html,
          { "@html-eslint": plugins["@html-eslint"] },
          scopedParsers.html,
        )
        .configs,
      json: new Options
        .json(
          f.files("json"),
          rulesets.json,
          { jsonc: plugins.jsonc },
          scopedParsers.json,
        )
        .configs,
      jsonc: new Options
        .jsonc(
          f.files("jsonc"),
          rulesets.jsonc,
          { jsonc: plugins.jsonc },
          scopedParsers.jsonc,
        )
        .configs,
      yml: new Options
        .yml(
          f.files("yml"),
          rulesets.yml,
          { yml: plugins.yml },
          scopedParsers.yml,
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
