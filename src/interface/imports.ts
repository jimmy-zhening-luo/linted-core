export interface Imports<
  BundledPlugin extends string,
  BundledParser extends string,
> {
  plugins: Record<
    BundledPlugin,
    unknown
  >;
  parsers: Record<
    BundledParser,
    unknown
  >;
}
