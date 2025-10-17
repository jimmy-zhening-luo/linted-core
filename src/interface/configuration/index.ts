import type { Defaults } from "./defaults";
import type { Extensions } from "./extensions";

export interface Configuration<
  Scope extends string,
  OptionalScope extends Scope,
  Parser extends Scope,
> {
  defaults: Defaults<
    Scope,
    Parser
  >;
  extensions: Partial<
    Extensions<
      Scope,
      OptionalScope
    >
  >;
}
