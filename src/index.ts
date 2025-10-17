import type { Input } from "./interface";
import type {
  Plugin,
  Parser,
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
    Plugin,
    Parser
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
