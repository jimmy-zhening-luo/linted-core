export type { Scope } from "./scopes";

import type { Input } from "./input";
import type { Output } from "./output";

export type { Input, Output };

import { scopes } from "./scopes";
import {
  Files,
  Rulesets,
  Options,
} from "./factory";

export default function (
  plugins: Input["plugins"],
  parsers: Input["parsers"],
  files: Input["files"],
  rules: Input["rules"],
): Output {
  try {
    const F = new Files(files),
    R = new Rulesets(rules),
    options: { [S in typeof scopes[number]]: InstanceType<typeof Options[S]>["configs"] } = {
      js: new Options
        .js(
          { "@stylistic": plugins["@stylistic"] },
          [],
          F.files("js"),
          R.ruleset("js"),
        ).configs,
      ts: new Options
        .ts(
          { "@stylistic": plugins["@stylistic"], "@typescript-eslint": plugins["@typescript-eslint"] },
          [parsers.ts],
          F.files("ts"),
          R.ruleset("ts"),
        ).configs,
      svelte: new Options
        .svelte(
          { "@stylistic": plugins["@stylistic"], "@typescript-eslint": plugins["@typescript-eslint"], svelte: plugins.svelte },
          [parsers.svelte, parsers.ts],
          F.files("svelte"),
          R.ruleset("svelte"),
        ).configs,
      mocha: new Options
        .mocha(
          { "@stylistic": plugins["@stylistic"], "@typescript-eslint": plugins["@typescript-eslint"], mocha: plugins.mocha },
          [parsers.ts],
          F.files("mocha"),
          R.ruleset("mocha"),
        ).configs,
      html: new Options
        .html(
          { "@html-eslint": plugins["@html-eslint"] },
          [parsers.html],
          F.files("html"),
          R.ruleset("html"),
        ).configs,
      json: new Options
        .json(
          { jsonc: plugins.jsonc },
          [parsers.jsonc],
          F.files("json"),
          R.ruleset("json"),
        ).configs,
      jsonc: new Options
        .jsonc(
          { jsonc: plugins.jsonc },
          [parsers.jsonc],
          F.files("jsonc"),
          R.ruleset("jsonc"),
        ).configs,
      yml: new Options
        .yml(
          { yml: plugins.yml },
          [parsers.yml],
          F.files("yml"),
          R.ruleset("yml"),
        ).configs,
    };

    return scopes.flatMap(scope => options[scope]);
  }
  catch (e) { throw new Error(`linted-core`, { cause: e }); }
}

// #region DEPRECATED
namespace Core {
  export type Scopes = typeof scopes[number];
  export namespace Input {
    export type Parsers = Input["parsers"];
    export type Plugins = Input["plugins"];
    export type Files = Input["files"];
    export namespace Files {
      export type Base = Files["files"];
      export type Includes = Files["includes"];
    }
    export type Rules = Input["rules"];
    export namespace Rules {
      export type Base = Rules["rules"];
      export type Overrides = Rules["overrides"];
    }
  }
  export type Output = Output[];
}

export type { Core };

// #endregion
