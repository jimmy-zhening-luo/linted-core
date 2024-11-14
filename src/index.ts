import { scopes } from "./scopes";
import {
  GlobalFactory,
  ScopeFactory,
  Options,
} from "./factory";
import type { Input, Output } from "./interface";

export type { Scopes } from "./scopes";
export type * from "./interface";
export default function (
  {
    imports: {
      plugins,
      parsers,
    },
    defaults,
    extensions,
  }: Input,
): Output {
  try {
    const global = new GlobalFactory(
      defaults.settings,
      defaults.ignores["*"],
      extensions["*"],
    ),
    factory = new ScopeFactory(
      defaults,
      extensions,
    ),
    options: { [S in typeof scopes[number]]: InstanceType<typeof Options[S]> } = {
      js: new Options
        .js(
          [],
          ...factory.produce("js"),
        ),
      ts: new Options
        .ts(
          [parsers.ts],
          ...factory.produce("ts"),
        ),
      svelte: new Options
        .svelte(
          [parsers.svelte, parsers.ts],
          ...factory.produce("svelte"),
        ),
      mocha: new Options
        .mocha(
          [parsers.ts],
          ...factory.produce("mocha"),
        ),
      html: new Options
        .html(
          [parsers.html],
          ...factory.produce("html"),
        ),
      json: new Options
        .json(
          [parsers.jsonc],
          ...factory.produce("json"),
        ),
      jsonc: new Options
        .jsonc(
          [parsers.jsonc],
          ...factory.produce("jsonc"),
        ),
      yml: new Options
        .yml(
          [parsers.yml],
          ...factory.produce("yml"),
        ),
    } as const;

    return [
      {
        name: `linted/*/plugins`,
        plugins,
      } as const,
      ...global.configs,
      ...scopes.flatMap(scope => options[scope].configs),
    ];
  }
  catch (e) {
    throw new Error(`Linted Core`, { cause: e });
  }
}
