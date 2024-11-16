import type { Input, Output } from "./interface";
import { scopes } from "./scopes";
import { Factory, ScopeSettings } from "./factory";

export type * from "./interface";
export type * from "./scopes";
export default function ({
  imports: { plugins, parsers },
  defaults,
  extensions,
}: Input): Output {
  try {
    const factory = new Factory(defaults, extensions),
    options: { readonly [S in typeof scopes[number]]: InstanceType<typeof ScopeSettings[S]> } = {
      js: new ScopeSettings.js([] as const),
      ts: new ScopeSettings.ts([parsers.ts] as const),
      svelte: new ScopeSettings.svelte([parsers.svelte, parsers.ts] as const),
      mocha: new ScopeSettings.mocha([parsers.ts] as const),
      html: new ScopeSettings.html([parsers.html] as const),
      json: new ScopeSettings.json([parsers.jsonc] as const),
      jsonc: new ScopeSettings.jsonc([parsers.jsonc] as const),
      yml: new ScopeSettings.yml([parsers.yml] as const),
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
