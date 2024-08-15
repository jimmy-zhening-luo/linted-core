import scopes, { type Scope } from "./scopes/index.js";
import type * as Boundary from "./boundary/index.js";
import { Options, Files, Rulesets } from "./factory/index.js";

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
    const F = new Files(files),
    R = new Rulesets(rules),
    Pa: { [S in Scope]: ConstructorParameters<typeof Options[S]>[3] } = {
      js: [] as const,
      ts: [parsers.ts] as const,
      svelte: [parsers.svelte, parsers.ts] as const,
      mocha: [parsers.ts] as const,
      html: [parsers.html] as const,
      json: [parsers.jsonc] as const,
      jsonc: [parsers.jsonc] as const,
      yml: [parsers.yml] as const,
      md: [parsers.md] as const,
    } as const,
    options: { [S in Scope]: InstanceType<typeof Options[S]>["configs"] } = {
      js: new Options
        .js(
          F.files("js"),
          R.ruleset("js"),
          { "@stylistic": plugins["@stylistic"] },
          Pa.js,
        ).configs,
      ts: new Options
        .ts(
          F.files("ts"),
          R.ruleset("ts"),
          { "@stylistic": plugins["@stylistic"], "@typescript-eslint": plugins["@typescript-eslint"] },
          Pa.ts,
        ).configs,
      svelte: new Options
        .svelte(
          F.files("svelte"),
          R.ruleset("svelte"),
          { "@stylistic": plugins["@stylistic"], "@typescript-eslint": plugins["@typescript-eslint"], svelte: plugins.svelte },
          Pa.svelte,
        ).configs,
      mocha: new Options
        .mocha(
          F.files("mocha"),
          R.ruleset("mocha"),
          { "@stylistic": plugins["@stylistic"], "@typescript-eslint": plugins["@typescript-eslint"], mocha: plugins.mocha },
          Pa.mocha,
        ).configs,
      html: new Options
        .html(
          F.files("html"),
          R.ruleset("html"),
          { "@html-eslint": plugins["@html-eslint"] },
          Pa.html,
        ).configs,
      json: new Options
        .json(
          F.files("json"),
          R.ruleset("json"),
          { jsonc: plugins.jsonc },
          Pa.json,
        ).configs,
      jsonc: new Options
        .jsonc(
          F.files("jsonc"),
          R.ruleset("jsonc"),
          { jsonc: plugins.jsonc },
          Pa.jsonc,
        ).configs,
      yml: new Options
        .yml(
          F.files("yml"),
          R.ruleset("yml"),
          { yml: plugins.yml },
          Pa.yml,
        ).configs,
      md: new Options
        .md(
          F.files("md"),
          R.ruleset("md"),
          { markdownlint: plugins.markdownlint },
          Pa.md,
        ).configs,
    };

    return scopes.flatMap(scope => options[scope]);
  }
  catch (e) { throw new Error(`linted-core`, { cause: e }); }
}
