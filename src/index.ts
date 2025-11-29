import factory from "./factory";
import type {
  Settings,
  Defaults,
  Extensions,
} from "../typings";

export default function<
  Scope extends string,
  Optional extends Scope,
>(
  scopes: readonly Scope[],
  optional: readonly Optional[],
  tree: Array<
    readonly [Scope, readonly Scope[]]
  >,
  parsers: Record<string, unknown>,
  settings: Settings<Scope>,
  defaults: Defaults<Scope>,
  extensions: Extensions<Scope, Optional>,
): unknown[] {
  return factory(
    scopes,
    optional,
    tree,
    parsers,
    settings,
    defaults,
    extensions,
  );
}
