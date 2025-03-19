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
      { name: "linted/*/plugins/", plugins } as const,
      ...factory.globals,
      ...scopes.flatMap(scope => factory.scope(scope)),
    ] as const;
  }
  catch (e) {
    throw new Error(`Linted Core`, { cause: e });
  }
}
