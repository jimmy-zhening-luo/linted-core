import type { Input } from "./interface";
import type {
  RequiredPlugin,
  RequiredParser,
} from "./scope";
import {
  scopes,
  optionalScopes,
  tree,
} from "./scope";
import { Factory } from "./factory";

export default function (
  {
    imports,
    configuration: {
      settings,
      defaults,
      extensions,
    },
  }: Input<
    RequiredPlugin,
    RequiredParser,
    (typeof scopes[number]),
    (typeof optionalScopes[number])
  >,
) {
  try {
    const factory = new Factory<
      RequiredPlugin,
      RequiredParser,
      (typeof scopes[number]),
      (typeof optionalScopes[number])
    >(
      tree,
      optionalScopes,
      imports,
      settings,
      defaults,
      extensions,
    );

    return (factory.globals as unknown[])
      .concat(
        scopes.flatMap(
          scope => factory.scope(scope),
        ),
      );
  }
  catch (e) {
    throw TypeError(
      "linted-core: ",
      { cause: e },
    );
  }
}
