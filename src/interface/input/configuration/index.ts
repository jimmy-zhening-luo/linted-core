import type { Settings } from "./settings";
import type { Defaults } from "./defaults";
import type { Extensions } from "./extensions";

export interface Configuration<
  Scope extends string,
  Parser extends string,
> {
  settings: Settings<
    Scope,
    Parser
  >;
  defaults: Defaults<Scope>;
  extensions: Extensions<Scope>;
}
