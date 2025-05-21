import type { Imports } from "../../../scopes";

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
      | Imports.Parsers
    ;
  };
  public abstract languageOptions: {
    parser:
      | null
      | Imports.Parsers
    ;
    globals:
      | null
      | string
    ;
  };
}
