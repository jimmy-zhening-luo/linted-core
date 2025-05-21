import type { Imports, Scope } from "../../scopes";
import type { Imported } from "./imported";
import type { Defaults, Extensions } from "./scopes";

export interface Input {
  readonly imports: Imported<
    Imports.Plugin,
    Imports.Parser
  >;
  readonly defaults: Defaults<Scope>;
  readonly extensions: Extensions<Scope>;
}
