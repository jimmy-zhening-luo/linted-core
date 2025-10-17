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
      defaults,
      extensions,
    },
  }: Input<
    (typeof scopes[number]),
    (typeof optionalScopes[number]),
    RequiredPlugin,
    RequiredParser
  >,
) {
  const factory = new Factory<
    (typeof scopes[number]),
    (typeof optionalScopes[number]),
    RequiredPlugin,
    RequiredParser
  >(
    tree,
    optionalScopes,
    imports,
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
