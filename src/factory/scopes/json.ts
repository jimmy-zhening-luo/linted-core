import { ScopeManifest } from "./manifest";

export default class JsonManifest extends ScopeManifest<"jsonc"> {
  public readonly processor = {} as const;
  public readonly language = {} as const;
  public readonly parserOptions = { parser: null } as const;
  public readonly languageOptions = { parser: "jsonc" } as const;
}
