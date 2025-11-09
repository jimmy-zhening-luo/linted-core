import factory from "./factory";
import type {
  Settings, Defaults, Extensions,
} from "../typings";
import type { MutableRules } from "../typings/rules";

export default function<
  Scope extends string,
  Optional extends Scope,
  RequiredPlugin extends string,
  RequiredParser extends Scope,
  Parser extends RequiredParser | Optional,
>(
  scopes: readonly Scope[],
  optional: readonly Optional[],
  tree: Array<
    readonly [Scope, readonly Scope[]]
  >,
  imports: {
    plugins:
      & Record<RequiredPlugin, unknown>
      & Partial<Record<Optional, unknown>>;
    parsers:
      & Record<RequiredParser, unknown>
      & Partial<Record<Optional, unknown>>;
  },
  settings: Settings<
    Scope,
    Parser
  >,
  defaults: Defaults<Scope>,
  extensions?: Extensions<
    Scope,
    Optional
  >,
) {
  return factory(
    scopes,
    optional,
    tree,
    imports,
    settings,
    defaults,
    extensions,
  ) as Array<
    {
      files?: (string | string[])[];
      ignores?: (string)[];
      rules?: MutableRules;
    }
  >;
}
