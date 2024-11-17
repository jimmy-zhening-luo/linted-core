import { ScopeManifest } from "./manifest";

export default class YmlManifest extends ScopeManifest<
  "yml"
> {
  public readonly processor = {} as const;
  public readonly language = {} as const;
  public readonly parserOptions = { parser: null } as const;
  public readonly languageOptions = {
    parser: "yml",
    globals: null,
  } as const;
}
