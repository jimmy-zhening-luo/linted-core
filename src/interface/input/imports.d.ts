export interface Imports<
  Plugins extends string,
  Parsers extends string,
> {
  plugins: Record<
    Plugins,
    unknown
  >;
  parsers: Record<
    Parsers,
    unknown
  >;
}
