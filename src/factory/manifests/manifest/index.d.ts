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
  },
  parserOptions: {
    parser:
      | null
      | Dependencies.Parsers
    ;
  },
  language?: string;
  processor?: string;
}
