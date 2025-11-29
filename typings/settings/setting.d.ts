export interface Setting {
  readonly languageOptions?: {
    readonly [option: string]: unknown;
    parser?: string;
    readonly parserOptions?: {
      readonly [parserOption: string]: unknown;
      parser?: string;
    };
  };
  readonly language?: string;
  readonly processor?: string;
}
