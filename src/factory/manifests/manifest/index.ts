import type { Dependencies } from "../../../scope";

export abstract class ScopeManifest {
  public abstract processor:
    | {
      processor: string;
    }
    | Record<string, never>
  ;
  public abstract language:
    | {
      language: string;
    }
    | Record<string, never>
  ;
  public abstract parserOptions: {
    parser:
      | null
      | Dependencies.Parsers
    ;
  };
  public abstract languageOptions: {
    parser:
      | null
      | Dependencies.Parsers
    ;
    globals:
      | null
      | string
    ;
  };
}
