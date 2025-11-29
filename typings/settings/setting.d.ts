export interface Setting<
  Scope extends string,
> {
  languageOptions?: {
    [property: string]: unknown;
    parser?: Scope;
    parserOptions?: {
      [property: string]: unknown;
      parser?: Scope;
    };
  };
  language?: string;
  processor?: string;
}
