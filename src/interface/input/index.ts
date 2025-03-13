import type { Packages } from "./packages";
import type { Defaults, Extensions } from "./scopes";
import type { Import, Scope } from "../../scope";

export interface Input {
  readonly imports: Packages<
    Import.Plugin,
    Import.Parser
  >;
  readonly defaults: Defaults<Scope>;
  readonly extensions: Extensions<Scope>;
}
