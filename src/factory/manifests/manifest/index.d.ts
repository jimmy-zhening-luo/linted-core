import type { Dependencies } from "../../../scope";

export interface IManifest {
  languageOptions: {
    parser:
      | null
      | Dependencies.Parsers
    ;
    globals:
      | null
      | string
    ;
    [property: string]: unknown;
  };
  parserOptions: {
    parser:
      | null
      | Dependencies.Parsers
    ;
    [property: string]: unknown;
  };
  language?: string;
  processor?: string;
}
