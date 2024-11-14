import { scopes } from "./scopes";
import {
  Factory,
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
    const factory = new Factory(
      defaults.settings,
      defaults.ignores["*"],
      defaults,
      extensions,
    ),
    options: { [S in typeof scopes[number]]: InstanceType<typeof Options[S]> } = {
      js: new Options
        .js(
          [],
          ...factory.scope("js"),
        ),
      ts: new Options
        .ts(
          [parsers.ts],
          ...factory.scope("ts"),
        ),
      svelte: new Options
        .svelte(
          [parsers.svelte, parsers.ts],
          ...factory.scope("svelte"),
        ),
      mocha: new Options
        .mocha(
          [parsers.ts],
          ...factory.scope("mocha"),
        ),
      html: new Options
        .html(
          [parsers.html],
          ...factory.scope("html"),
        ),
      json: new Options
        .json(
          [parsers.jsonc],
          ...factory.scope("json"),
        ),
      jsonc: new Options
        .jsonc(
          [parsers.jsonc],
          ...factory.scope("jsonc"),
        ),
      yml: new Options
        .yml(
          [parsers.yml],
          ...factory.scope("yml"),
        ),
    } as const;

    return [
      { name: `linted/*/plugins`, plugins } as const,
      factory.settings,
      factory.ignores,
      ...scopes.flatMap(scope => options[scope].configs),
    ];
  }
  catch (e) {
    throw new Error(`Linted Core`, { cause: e });
  }
}
