import type { Imports, Scope } from "../../scopes";
import type { Imported } from "./imported";
import type { Defaults, Extensions } from "./scopes";

export interface Input {
  readonly imports: Imported<
    Imports.Plugins,
    Imports.Parsers
  >;
  readonly defaults: Defaults<Scope>;
  readonly extensions: Extensions<Scope>;
}
