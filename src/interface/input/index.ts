import type { Import, Scope } from "../../scope";
import type { Imports } from "./imports";
import type { Defaults, Extensions } from "./scopes";

export interface Input {
  readonly imports: Imports<
    Import.Plugin,
    Import.Parser
  >;
  readonly defaults: Defaults<Scope>;
  readonly extensions: Extensions<Scope>;
}
