import type { Imports } from "./imports";
import type { Configuration } from "./configuration";

export interface Input<
  RequiredPlugin extends string,
  RequiredParser extends string,
  Scope extends string,
  OptionalScope extends string,
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
