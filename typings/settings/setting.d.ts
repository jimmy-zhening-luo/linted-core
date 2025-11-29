export interface Setting {
  languageOptions?: {
    [option: string]: unknown;
    parser?: string;
    parserOptions?: {
      [parserOption: string]: unknown;
      parser?: string;
    };
  };
  language?: string;
  processor?: string;
}
