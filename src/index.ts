import scopes, { type Scope } from "./scopes/index.js";
import type * as Boundary from "./boundary/index.js";
import { Options, Files, Rulesets } from "./factory/index.js";

export type { Boundary };
export default function (
  plugins: Boundary.Input.Plugins,
  parsers: Boundary.Input.Parsers,
  files: Boundary.Input.Files,
  rules: Boundary.Input.Rules,
): Boundary.Output[] {
  try {
    const F = new Files(files),
    R = new Rulesets(rules),
    options: { [S in Scope]: InstanceType<typeof Options[S]>["configs"] } = {
      js: new Options
        .js(
          F.files("js"),
          R.ruleset("js"),
          { "@stylistic": plugins["@stylistic"] },
          [],
        ).configs,
      ts: new Options
        .ts(
          F.files("ts"),
          R.ruleset("ts"),
          { "@stylistic": plugins["@stylistic"], "@typescript-eslint": plugins["@typescript-eslint"] },
          [parsers.ts],
        ).configs,
      svelte: new Options
        .svelte(
          F.files("svelte"),
          R.ruleset("svelte"),
          { "@stylistic": plugins["@stylistic"], "@typescript-eslint": plugins["@typescript-eslint"], svelte: plugins.svelte },
          [parsers.svelte, parsers.ts],
        ).configs,
      mocha: new Options
        .mocha(
          F.files("mocha"),
          R.ruleset("mocha"),
          { "@stylistic": plugins["@stylistic"], "@typescript-eslint": plugins["@typescript-eslint"], mocha: plugins.mocha },
          [parsers.ts],
        ).configs,
      html: new Options
        .html(
          F.files("html"),
          R.ruleset("html"),
          { "@html-eslint": plugins["@html-eslint"] },
          [parsers.html],
        ).configs,
      json: new Options
        .json(
          F.files("json"),
          R.ruleset("json"),
          { jsonc: plugins.jsonc },
          [parsers.jsonc],
        ).configs,
      jsonc: new Options
        .jsonc(
          F.files("jsonc"),
          R.ruleset("jsonc"),
          { jsonc: plugins.jsonc },
          [parsers.jsonc],
        ).configs,
      yml: new Options
        .yml(
          F.files("yml"),
          R.ruleset("yml"),
          { yml: plugins.yml },
          [parsers.yml],
        ).configs,
      md: new Options
        .md(
          F.files("md"),
          R.ruleset("md"),
          { markdownlint: plugins.markdownlint },
          [parsers.md],
        ).configs,
    };

    return scopes.flatMap(scope => options[scope]);
  }
  catch (e) { throw new Error(`linted-core`, { cause: e }); }
}
