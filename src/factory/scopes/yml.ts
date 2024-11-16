import { ScopeManifest } from "./manifest";

export default class YmlManifest extends ScopeManifest<
  "yml"
> {
  public readonly processor = {} as const;
  public readonly language = {} as const;
  public readonly parserOptions = {} as const;
  public readonly languageOptions = { parser: "yml" } as const;
}
