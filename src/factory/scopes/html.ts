import { ScopeManifest } from "./manifest";

export default class HtmlManifest extends ScopeManifest<"html"> {
  public readonly processor = {} as const;
  public readonly language = {} as const;
  public readonly parserOptions = { parser: null } as const;
  public readonly languageOptions = { parser: "html" } as const;
}
