import type { Imports } from "./imports";
import type { Configuration } from "./configuration";

export interface Input<
  RequiredPlugin extends string,
  RequiredParser extends Scope,
  Scope extends string,
  OptionalScope extends Scope,
> {
  imports: Imports<
    RequiredPlugin,
    RequiredParser
  >;
  configuration: Configuration<
    (
      | RequiredParser
      | OptionalScope
    ),
    Scope,
    OptionalScope
  >;
}
