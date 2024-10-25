export type { Scope } from "./scopes";

import type { Input } from "./input";
import type { Output } from "./output";

export type { Input, Output };

import { scopes } from "./scopes";
import {
  Factory,
  Options,
} from "./factory";

export default function (input: Input): Output {
  try {
    const {
      parsers,
      plugins,
      files,
      rules,
    } = input,
    factory = new Factory(files, rules),
    options: { [S in typeof scopes[number]]: InstanceType<typeof Options[S]>["configs"] } = {
      js: new Options
        .js(
          { "@stylistic": plugins["@stylistic"] },
          [],
          ...factory.produce("js"),
        ).configs,
      ts: new Options
        .ts(
          { "@stylistic": plugins["@stylistic"], "@typescript-eslint": plugins["@typescript-eslint"] },
          [parsers.ts],
          ...factory.produce("ts"),
        ).configs,
      svelte: new Options
        .svelte(
          { "@stylistic": plugins["@stylistic"], "@typescript-eslint": plugins["@typescript-eslint"], svelte: plugins.svelte },
          [parsers.svelte, parsers.ts],
          ...factory.produce("svelte"),
        ).configs,
      mocha: new Options
        .mocha(
          { "@stylistic": plugins["@stylistic"], "@typescript-eslint": plugins["@typescript-eslint"], mocha: plugins.mocha },
          [parsers.ts],
          ...factory.produce("mocha"),
        ).configs,
      html: new Options
        .html(
          { "@html-eslint": plugins["@html-eslint"] },
          [parsers.html],
          ...factory.produce("html"),
        ).configs,
      json: new Options
        .json(
          { jsonc: plugins.jsonc },
          [parsers.jsonc],
          ...factory.produce("json"),
        ).configs,
      jsonc: new Options
        .jsonc(
          { jsonc: plugins.jsonc },
          [parsers.jsonc],
          ...factory.produce("jsonc"),
        ).configs,
      yml: new Options
        .yml(
          { yml: plugins.yml },
          [parsers.yml],
          ...factory.produce("yml"),
        ).configs,
    };

    return scopes.flatMap(scope => options[scope]);
  }
  catch (e) { throw new Error(`linted-core`, { cause: e }); }
}
