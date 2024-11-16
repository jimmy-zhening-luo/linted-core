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
    const factory = new Factory(parsers, defaults, extensions),
    options: { readonly [S in typeof scopes[number]]: InstanceType<typeof ScopeSettings[S]> } = {
      js: new ScopeSettings.js(),
      ts: new ScopeSettings.ts(),
      svelte: new ScopeSettings.svelte(),
      mocha: new ScopeSettings.mocha(),
      html: new ScopeSettings.html(),
      json: new ScopeSettings.json(),
      jsonc: new ScopeSettings.jsonc(),
      yml: new ScopeSettings.yml(),
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
