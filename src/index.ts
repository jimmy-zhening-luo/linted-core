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
      plugins,
      parsers,
      files,
      rules,
    } = input,
    base = {
      name: "linted",
      plugins,
      linterOptions: {
        noInlineConfig: true,
        reportUnusedDisableDirectives: "error",
      },
      languageOptions: {
        sourceType: "module",
        ecmaVersion: 2023,
      }
    } as const,
    factory = new Factory(files, rules),
    options: { [S in typeof scopes[number]]: InstanceType<typeof Options[S]>["configs"] } = {
      js: new Options
        .js(
          [],
          ...factory.produce("js"),
        ).configs,
      ts: new Options
        .ts(
          [parsers.ts],
          ...factory.produce("ts"),
        ).configs,
      svelte: new Options
        .svelte(
          [parsers.svelte, parsers.ts],
          ...factory.produce("svelte"),
        ).configs,
      mocha: new Options
        .mocha(
          [parsers.ts],
          ...factory.produce("mocha"),
        ).configs,
      html: new Options
        .html(
          [parsers.html],
          ...factory.produce("html"),
        ).configs,
      json: new Options
        .json(
          [parsers.jsonc],
          ...factory.produce("json"),
        ).configs,
      jsonc: new Options
        .jsonc(
          [parsers.jsonc],
          ...factory.produce("jsonc"),
        ).configs,
      yml: new Options
        .yml(
          [parsers.yml],
          ...factory.produce("yml"),
        ).configs,
    };

    return [
      base,
      ...scopes.flatMap(scope => options[scope]),
    ];
  }
  catch (e) { throw new Error(`Linted Core`, { cause: e }); }
}
