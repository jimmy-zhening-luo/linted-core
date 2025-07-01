import type { Imports } from "./imports";
import type { Configuration } from "./configuration";

export interface Input<
  Plugin extends string,
  Parser extends string,
  Scope extends string,
> {
  imports: Imports<
    Plugin,
    Parser
  >;
  configuration: Configuration<
    Scope
  >;
}
