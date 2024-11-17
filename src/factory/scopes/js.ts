import { ScopeManifest } from "./manifest";

export default class JsManifest extends ScopeManifest {
  public readonly processor = {} as const;
  public readonly language = {} as const;
  public readonly parserOptions = { parser: null } as const;
  public readonly languageOptions = { parser: null } as const;
}
