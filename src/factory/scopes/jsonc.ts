import { ScopeManifest } from "./manifest";

export default class JsoncManifest extends ScopeManifest<
  "jsonc"
> {
  public readonly processor = {} as const;
  public readonly language = {} as const;
  public readonly parserOptions = {} as const;
  public readonly languageOptions = { parser: "jsonc" } as const;
}