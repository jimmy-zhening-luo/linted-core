export interface RequiredImports<
  RequiredPlugin extends string,
  RequiredParser extends string,
> {
  plugins: Record<
    RequiredPlugin,
    unknown
  >;
  parsers: Record<
    RequiredParser,
    unknown
  >;
}
