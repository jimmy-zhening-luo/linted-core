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

export default function (input: Input): Output {
  try {
    const { parsers, plugins } = input,
    files = new Files(input.files),
    rulesets = new Rulesets(input.rules),
    options: { [S in typeof scopes[number]]: InstanceType<typeof Options[S]>["configs"] } = {
      js: new Options
        .js(
          { "@stylistic": plugins["@stylistic"] },
          [],
          files.files("js"),
          rulesets.ruleset("js"),
        ).configs,
      ts: new Options
        .ts(
          { "@stylistic": plugins["@stylistic"], "@typescript-eslint": plugins["@typescript-eslint"] },
          [parsers.ts],
          files.files("ts"),
          rulesets.ruleset("ts"),
        ).configs,
      svelte: new Options
        .svelte(
          { "@stylistic": plugins["@stylistic"], "@typescript-eslint": plugins["@typescript-eslint"], svelte: plugins.svelte },
          [parsers.svelte, parsers.ts],
          files.files("svelte"),
          rulesets.ruleset("svelte"),
        ).configs,
      mocha: new Options
        .mocha(
          { "@stylistic": plugins["@stylistic"], "@typescript-eslint": plugins["@typescript-eslint"], mocha: plugins.mocha },
          [parsers.ts],
          files.files("mocha"),
          rulesets.ruleset("mocha"),
        ).configs,
      html: new Options
        .html(
          { "@html-eslint": plugins["@html-eslint"] },
          [parsers.html],
          files.files("html"),
          rulesets.ruleset("html"),
        ).configs,
      json: new Options
        .json(
          { jsonc: plugins.jsonc },
          [parsers.jsonc],
          files.files("json"),
          rulesets.ruleset("json"),
        ).configs,
      jsonc: new Options
        .jsonc(
          { jsonc: plugins.jsonc },
          [parsers.jsonc],
          files.files("jsonc"),
          rulesets.ruleset("jsonc"),
        ).configs,
      yml: new Options
        .yml(
          { yml: plugins.yml },
          [parsers.yml],
          files.files("yml"),
          rulesets.ruleset("yml"),
        ).configs,
    };

    return scopes.flatMap(scope => options[scope]);
  }
  catch (e) { throw new Error(`linted-core`, { cause: e }); }
}
