export interface ScopeManifest<Parser extends string> {
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
