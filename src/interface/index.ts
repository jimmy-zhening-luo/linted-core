import type { Imports } from "./imports";
import type { Configuration } from "./configuration";

export interface Input<
  Scope extends string,
  OptionalScope extends Scope,
  BundledPlugin extends string,
  BundledParser extends Scope,
> {
  imports: Imports<
    BundledPlugin,
    BundledParser
  >;
  configuration: Configuration<
    Scope,
    OptionalScope,
    (
      | BundledParser
      | OptionalScope
    )
  >;
}
