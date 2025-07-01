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
    [string]: unknown;
  },
  parserOptions: {
    parser:
      | null
      | Dependencies.Parsers
    ;
    [string]: unknown;
  },
  language?: string;
  processor?: string;
}
