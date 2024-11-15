import type { Scopes, Plugins, Parsers } from "../scopes";
import type * as Inputs from "./inputs";

export interface Input {
  readonly imports: Inputs.Imports<
    Plugins,
    Parsers
  >;
  readonly defaults: Inputs.Defaults<Scopes>;
  readonly extensions: Inputs.Extensions<Scopes>;
}
