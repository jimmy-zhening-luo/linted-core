import { Configuration } from "./interface";
import factory from "./factory";

export default function <
  Scope extends string,
  Optional extends Scope,
  RequiredPlugin extends string,
  RequiredParser extends Scope,
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
    plugins: Record<RequiredPlugin, unknown>;
    parsers: Record<RequiredParser, unknown>;
  },
  configuration: Configuration<
    Scope,
    Optional,
    RequiredParser | Optional
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
