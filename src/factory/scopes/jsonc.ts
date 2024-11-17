import { ScopeManifest } from "./manifest";

export default class JsoncManifest extends ScopeManifest {
  public readonly languageOptions = {
    parser: null,
    globals: null,
  } as const;
  public readonly parserOptions = { parser: null } as const;
  public readonly processor = {} as const;
  public readonly language = {} as const;
}
