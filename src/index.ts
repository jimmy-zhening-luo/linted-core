import type { Input, Output } from "./interface";
import { scopes, tree } from "./scopes";
import { Factory } from "./factory";

export type * from "./interface/input";
export type * from "./interface/proto";
export type * from "./scopes";
export default function (
  {
    imports: {
      plugins,
      parsers,
    },
    defaults,
    extensions,
  }: Input,
) {
  try {
    const factory = new Factory(
      tree,
      parsers,
      defaults,
      extensions,
    );

    return [
      {
        name: "linted/*/plugins/",
        plugins,
      },
      ...factory.globals,
      ...scopes.flatMap(scope => factory.scope(scope)),
    ] satisfies Output satisfies unknown[] as unknown[];
  }
  catch (e) {
    throw new Error(
      "linted-core: ",
      { cause: e },
    );
  }
}
