import type { Input, Output } from "./interface";
import { scopes, tree } from "./scope";
import { Factory } from "./factory";

export type * from "./interface";
export type * from "./scope";
export default function ({
  imports: { plugins, parsers },
  defaults,
  extensions,
}: Input): Output {
  try {
    const factory = new Factory(tree, parsers, defaults, extensions);

    return [
      { name: "plugins", plugins } as const,
      factory.common.settings,
      factory.common.ignores,
      ...scopes.flatMap(scope => factory.scope(scope)),
    ] as const;
  }
  catch (e) {
    throw new Error(`Linted Core`, { cause: e });
  }
}
