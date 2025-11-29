import factory from "./factory";
import type {
  Settings,
  Defaults,
  Rules,
} from "../typings";

export default function<
  Scope extends string,
  Optional extends Scope,
>(
  scopes: readonly Scope[],
  optional: readonly Optional[],
  tree: readonly (readonly [Scope, readonly Scope[]])[],
  parsers: Record<string, unknown>,
  settings: Settings<Scope>,
  defaults: Defaults<Scope>,
  extensions: Partial<
    {
      "*": {
        ignores?: string[];
        override?: boolean;
      };
    } & {
      readonly [K in Scope]: {
        files?: readonly (string | readonly string[])[];
        ignores?: readonly string[];
        rules?: Rules;
      }
    } & {
      readonly [K in Optional]: {
        plugin: unknown;
        parser: unknown;
      }
    }
  >,
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
