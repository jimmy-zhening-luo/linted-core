import type { Imports } from "./imports";
import type { Configuration } from "./configuration";

export interface Input<
  Scope extends string,
  Optional extends Scope,
  Plugin extends string,
  Parser extends Scope,
> {
  imports: Imports<
    Plugin,
    Parser
  >;
  configuration: Configuration<
    Scope,
    Optional,
    (
      | Parser
      | Optional
    )
  >;
}
