import type { Input } from "./interface";
import type {
  BundledPlugin,
  BundledParser,
} from "./scope";
import {
  scopes,
  optional,
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
    (typeof optional[number]),
    BundledPlugin,
    BundledParser
  >,
) {
  return factory(
    scopes,
    optional,
    tree,
    imports,
    defaults,
    extensions,
  );
}
