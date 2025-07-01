export interface Imports<
  Plugin extends string,
  Parser extends string,
> {
  plugins: Record<
    Plugin,
    unknown
  >;
  parsers: Record<
    Parser,
    unknown
  >;
}
