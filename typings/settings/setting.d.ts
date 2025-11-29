export interface Setting {
  languageOptions?: {
    [property: string]: unknown;
    parser?: string;
    parserOptions?: {
      [property: string]: unknown;
      parser?: string;
    };
  };
  language?: string;
  processor?: string;
}
