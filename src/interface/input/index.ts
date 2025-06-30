import type { Imports } from "./imports";
import type { Configuration } from "./configuration";

export interface Input<
  Plugins extends string,
  Parsers extends string,
  Scope extends string,
> {
  imports: Imports<
    Plugins,
    Parsers
  >;
  configuration: Configuration<
    Scope
  >;
}
