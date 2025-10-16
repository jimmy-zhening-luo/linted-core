import type { Imports } from "./imports";
import type { Configuration } from "./configuration";

export interface Input<
  Scope extends string,
  OptionalScope extends Scope,
  RequiredPlugin extends string,
  RequiredParser extends Scope,
> {
  imports: Imports<
    RequiredPlugin,
    RequiredParser
  >;
  configuration: Configuration<
    Scope,
    OptionalScope,
    (
      | RequiredParser
      | OptionalScope
    )
  >;
}
