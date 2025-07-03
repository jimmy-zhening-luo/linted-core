import type { RequiredImports } from "./required";
import type { OptionalImports } from "./optional";

export interface Imports<
  RequiredPlugin extends string,
  RequiredParser extends string,
  OptionalImport extends string,
> {
  required: RequiredImports<
    RequiredPlugin,
    RequiredParser
  >;
  optional?: OptionalImports<
    OptionalImport
  >;
}
