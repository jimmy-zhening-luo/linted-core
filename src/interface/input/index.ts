import type { Imports } from "./imports";
import type { Defaults, Extensions } from "./scopes";
import type { Parsers, Scopes } from "../../scopes";

export interface Input {
  readonly imports: Imports<Parsers>;
  readonly defaults: Defaults<Scopes>;
  readonly extensions: Extensions<Scopes>;
}
