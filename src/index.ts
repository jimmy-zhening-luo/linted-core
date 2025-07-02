import { Factory } from "./factory";
import {
  scopes,
  tree,
  registry,
} from "./scope";
import type {
  IPlugin,
  IParser,
} from "./scope";
import type {
  Input,
  Output,
} from "./interface";

type Scope = typeof scopes[number];

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
    IPlugin,
    IParser,
    Scope
  >,
) {
  try {
    const factory = new Factory<
      IPlugin,
      IParser,
      Scope
    >(
      tree,
      registry,
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
