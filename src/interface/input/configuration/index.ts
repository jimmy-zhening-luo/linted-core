import type { Settings } from "./settings";
import type { Defaults } from "./defaults";
import type { Extensions } from "./extensions";

export interface Configuration<
  Parser extends Scope,
  Scope extends string,
  OptionalScope extends Scope,
> {
  settings: Settings<
    Scope,
    Parser
  >;
  defaults: Defaults<Scope>;
  extensions: Extensions<
    Scope,
    OptionalScope
  >;
}
