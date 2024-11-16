import { ScopeManifest } from "./manifest";

export default class JsManifest extends ScopeManifest {
  public readonly processor = {} as const;
  public readonly language = {} as const;
  public readonly parserOptions = {} as const;
  public readonly languageOptions = {} as const;
}
