export interface ScopeManifest<
  Plugin extends string,
  Parser extends string,
> {
  plugins?: {
    readonly Plugin[];
  };
  languageOptions?: {
    [property: string]: unknown;
    parser?: Parser;
  };
  parserOptions?: {
    [property: string]: unknown;
    parser?: Parser;
  };
  language?: string;
  processor?: string;
}
