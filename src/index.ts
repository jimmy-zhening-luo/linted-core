import type { Input, Output } from "./interface";
import * as Scopes from "./scope";
import { Factory } from "./factory";

export type * from "./interface";
export type * from "./scope";
export default function ({
  imports: { plugins, parsers },
  defaults,
  extensions,
}: Input): Output {
  try {
    const factory = new Factory(Scopes.tree, parsers, defaults, extensions);

    return [
      { name: "plugins", plugins } as const,
      factory.common.settings,
      factory.common.ignores,
      ...Scopes.scopes.flatMap(scope => factory.scope(scope)),
    ] as const;
  }
  catch (e) {
    throw new Error(`Linted Core`, { cause: e });
  }
}
