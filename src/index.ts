import {
  Options,
  Files,
  Rulesets,
} from "./factory/index.js";
import scopes from "./scopes/index.js";
import type { Scope } from "./scopes/index.js";
import type * as Core from "./boundary/index.js";

export default function (
  plugins: Core.Input.Plugins,
  parsers: Core.Input.Parsers,
  files: Core.Input.Files,
  rules: Core.Input.Rules,
): Core.Output[] {
  try {
    const F = new Files(files),
    R = new Rulesets(rules),
    options: { [S in typeof scopes[number]]: InstanceType<typeof Options[S]>["configs"] } = {
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

namespace LintCore {
  export type Scopes = Scope;
  export namespace Input {
    export type Parsers = Core.Input.Parsers;
    export type Plugins = Core.Input.Plugins;
    export type Files = Core.Input.Files;
    export namespace Files {
      export type Base = Core.Input.Files.FileBase;
      export type Includes = Core.Input.Files.Includes;
    }
    export type Rules = Core.Input.Rules;
    export namespace Rules {
      export type Base = Core.Input.Rules.RuleBase;
      export type Overrides = Core.Input.Rules.Overrides;
    }
  }
  export type Output = Core.Output[];
}

export type { LintCore };
