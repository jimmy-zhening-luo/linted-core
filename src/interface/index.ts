import type { Defaults } from "./defaults";
import type { Extensions } from "./extensions";

export interface Configuration<
  Scope extends string,
  Optional extends Scope,
  Plugin extends string,
  Parser extends Scope,
> {
  defaults: Defaults<
    Scope,
    Plugin,
    Parser
  >;
  extensions: Partial<
    Extensions<
      Scope,
      Optional
    >
  >;
}
