export interface IManifest<
  Parser,
> {
  languageOptions: {
    [property: string]: unknown;
    parser?: Parser;
    globals?: string;
  };
  parserOptions: {
    [property: string]: unknown;
    parser?: Parser;
  };
  language?: string;
  processor?: string;
}
