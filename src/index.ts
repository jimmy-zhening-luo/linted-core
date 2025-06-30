import { Factory } from "./factory";
import {
  scopes,
  tree,
} from "./scope";
import type {
  Input,
  Output,
} from "./interface";

export type {
  Input,
  scopes,
};
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
      ...scopes
        .flatMap(
          scope => factory.scope(scope),
        ),
    ] satisfies Output satisfies unknown[] as unknown[];
  }
  catch (e) {
    throw new Error(
      "linted-core: ",
      { cause: e },
    );
  }
}
