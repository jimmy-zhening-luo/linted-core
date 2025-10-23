import type {
  Settings,
  Configuration,
} from "./interface";
import factory from "./factory";

export default function<
  Scope extends string,
  Optional extends Scope,
  RequiredPlugin extends string,
  RequiredParser extends Scope,
  Plugin extends RequiredPlugin | Optional,
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
    Plugin,
    Parser
  >,
  configuration: Configuration<Scope, Optional>,
) {
  return factory(
    scopes,
    optional,
    tree,
    imports,
    settings,
    configuration,
  ) as unknown[];
}
