import type { Imports } from "./imports";
import type { Configuration } from "./configuration";

export interface Input<
  RequiredPlugin extends string,
  RequiredParser extends string,
  OptionalImport extends string,
  Scope extends string,
> {
  imports: Imports<
    RequiredPlugin,
    RequiredParser,
    OptionalImport
  >;
  configuration: Configuration<
    Scope
  >;
}
