import type { Defaults } from "./defaults";
import type { Extensions } from "./extensions";

export interface Configuration<
  Scope extends string,
  Optional extends Scope,
  Parser extends Scope,
> {
  defaults: Defaults<
    Scope,
    Parser
  >;
  extensions: Partial<
    Extensions<
      Scope,
      Optional
    >
  >;
}
