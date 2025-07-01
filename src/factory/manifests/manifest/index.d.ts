import type { Dependencies } from "../../../scope";

export interface IManifest {
  languageOptions: {
    [property: string]: unknown;
    parser:
      | null
      | Dependencies.Parsers
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
      | Dependencies.Parsers
    ;
  };
  language?: string;
  processor?: string;
}
