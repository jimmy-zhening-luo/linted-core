import type { Input } from "./interface";
import type {
  BundledPlugin,
  BundledParser,
} from "./scope";
import {
  scopes,
  optionalScopes,
  tree,
} from "./scope";
import factory from "./factory";

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
    BundledPlugin,
    BundledParser
  >,
) {
  return factory(
    scopes,
    optionalScopes,
    tree,
    imports,
    defaults,
    extensions,
  );
}
