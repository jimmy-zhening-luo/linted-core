import type { Input, Output } from "./interface";
import { scopes } from "./scopes";
import { Factory, Options } from "./factory";

export type * from "./interface";
export type * from "./scopes";
export default function ({
  imports: { plugins, parsers },
  defaults,
  extensions,
}: Input): Output {
  try {
    const factory = new Factory(defaults, extensions),
    options: { readonly [S in typeof scopes[number]]: InstanceType<typeof Options[S]> } = {
      js: new Options.js([] as const),
      ts: new Options.ts([parsers.ts] as const),
      svelte: new Options.svelte([parsers.svelte, parsers.ts] as const),
      mocha: new Options.mocha([parsers.ts] as const),
      html: new Options.html([parsers.html] as const),
      json: new Options.json([parsers.jsonc] as const),
      jsonc: new Options.jsonc([parsers.jsonc] as const),
      yml: new Options.yml([parsers.yml] as const),
    } as const;

    return [
      { name: `linted/*/plugins`, plugins } as const,
      factory.common.settings,
      factory.common.ignores,
      ...scopes.flatMap(scope => factory.scope(scope, options[scope])),
    ] as const;
  }
  catch (e) {
    throw new Error(`Linted Core`, { cause: e });
  }
}
