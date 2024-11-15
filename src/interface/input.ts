import type * as Inputs from "./inputs";

export interface Input<
  Scopes extends string,
  Plugins extends string,
  Parsers extends string,
> {
  readonly imports: Inputs.Imports<
    Plugins,
    Parsers
  >;
  readonly defaults: Inputs.Defaults<Scopes>;
  readonly extensions: Inputs.Extensions<Scopes>;
}
