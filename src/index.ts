import type { Input, Output } from "./interface";
import { scopes, tree } from "./scopes";
import { Factory } from "./factory";

export type * from "./interface";
export type * from "./scopes";
export default function ({
  imports: { plugins, parsers },
  defaults,
  extensions,
}: Input): Output {
  try {
    const factory = new Factory(tree, parsers, defaults, extensions);

    return [
      factory.common.settings,
      { name: `linted/*/plugins/`, plugins } as const,
      factory.common.ignores,
      ...scopes.flatMap(scope => factory.scope(scope)),
    ] as const;
  }
  catch (e) {
    throw new Error(`Linted Core`, { cause: e });
  }
}
