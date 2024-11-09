export type { Scope } from "./scopes";
export type {
  Plugins,
  RuleEntry,
  RuleRecord,
  RuleState,
  GlobalConfigSystem,
  GlobalConfigIgnores,
  ScopedConfig,
} from "./objects";

import type {
  Input,
  Output,
} from "./interface";

export type {
  Input,
  Output,
};

import { scopes } from "./scopes";
import {
  Global,
  Factory,
  Options,
} from "./factory";

export default function (
  {
    plugins,
    parsers,
    settings,
    globals,
    files,
    ignores,
    rules,
  }: Input,
): Output {
  try {
    const global = new Global(
      plugins,
      settings,
      globals,
    ),
    factory = new Factory(
      files,
      ignores,
      rules,
    ),
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
      ...global.configs,
      ...scopes.flatMap(scope => options[scope]),
    ];
  }
  catch (e) { throw new Error(`Linted Core`, { cause: e }); }
}
