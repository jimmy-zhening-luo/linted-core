import type { Packages } from "./packages";
import type { Defaults, Extensions } from "./scopes";
import type { Import, Scopes } from "../../scopes";

export interface Input {
  readonly imports: Packages<
    Import.Plugins,
    Import.Parsers
  >;
  readonly defaults: Defaults<Scopes>;
  readonly extensions: Extensions<Scopes>;
}
