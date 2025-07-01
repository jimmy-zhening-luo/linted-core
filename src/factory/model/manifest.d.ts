export interface IManifest<Parser> {
  languageOptions: {
    [property: string]: unknown;
    parser:
      | null
      | Parser
    ;
    globals:
      | null
      | string
    ;
  };
  parserOptions: {
    [property: string]: unknown;
    parser:
      | null
      | Parser
    ;
  };
  language?: string;
  processor?: string;
}
