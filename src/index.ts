import { Configuration } from "./interface";
import factory from "./factory";

export default function <
  Scope extends string,
  Optional extends Scope,
  Plugin extends string,
  Parser extends Scope,
>(
  scopes: readonly Scope[],
  optional: readonly Optional[],
  tree: Array<
    readonly [
      Scope,
      readonly Scope[],
    ]
  >,
  imports: {
    plugins: Record<Plugin, unknown>;
    parsers: Record<Parser, unknown>;
  },
  configuration: Configuration<
    Scope,
    Optional,
    Parser
  >,
) {
  return factory(
    scopes,
    optional,
    tree,
    imports,
    configuration,
  );
}
