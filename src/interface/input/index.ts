import type { Configuration } from "./configuration";

export interface Input<
  Plugin extends string,
  Parser extends string,
  Scope extends string,
> {
  imports: {
    plugins: Record<
      Plugin,
      unknown
    >;
    parsers: Record<
      Parser,
      unknown
    >;
  };
  configuration: Configuration<
    Scope
  >;
}
