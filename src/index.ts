import scopes, { type Scope } from "./scopes/Scopes.js";
import type * as Boundary from "./boundary/boundary.js";
import {
  Options,
  Files,
  Ruleset,
  Rule,
} from "./factory/factory.js";

export type {
  Scope,
  Boundary,
};
export default function (
  plugins: Boundary.Input.Plugins,
  parsers: Boundary.Input.Parsers,
  base: Boundary.Input.Files,
  includes: Partial<Boundary.Input.Files>,
  rules: Boundary.Input.Rules,
  overrides: Boundary.Input.Overrides,
): Boundary.Output[] {
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
          {
            "@stylistic": plugins["@stylistic"],
          },
          scopedParsers.js,
        )
        .configs,
      ts: new Options
        .ts(
          files.files("ts"),
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
          files.files("svelte"),
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
          files.files("html"),
          rulesets.html,
          { "@html-eslint": plugins["@html-eslint"] },
          scopedParsers.html,
        )
        .configs,
      json: new Options
        .json(
          files.files("json"),
          rulesets.json,
          { jsonc: plugins.jsonc },
          scopedParsers.json,
        )
        .configs,
      jsonc: new Options
        .jsonc(
          files.files("jsonc"),
          rulesets.jsonc,
          { jsonc: plugins.jsonc },
          scopedParsers.jsonc,
        )
        .configs,
      yml: new Options
        .yml(
          files.files("yml"),
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
