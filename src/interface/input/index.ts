import type { Imports, Scope } from "../../scopes";
import type { Imported } from "./imported";
import type { Defaults, Extensions } from "./scopes";

export interface Input {
  imports: Imported<
    Imports.Plugins,
    Imports.Parsers
  >;
  defaults: Defaults<Scope>;
  extensions: Extensions<Scope>;
}
