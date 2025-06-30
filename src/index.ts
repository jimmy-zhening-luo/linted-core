import { Factory } from "./factory";
import {
  scopes,
  tree,
} from "./scope";
import type { Dependencies } from "./scope";
import type {
  Input,
  Output,
} from "./interface";

export type * from "./scope";
export type * from "./interface";
export default function (
  {
    imports: {
      plugins,
      parsers,
    },
    configuration: {
      defaults,
      extensions,
    },
  }: Input<
    Dependencies.Plugins,
    Dependencies.Parsers,
    typeof scopes[number]
  >,
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
      ...scopes
        .flatMap(
          scope => factory.scope(scope),
        ),
    ] satisfies Output as unknown[];
  }
  catch (e) {
    throw new Error(
      "linted-core: ",
      { cause: e },
    );
  }
}
