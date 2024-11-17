import { ScopeManifest } from "./manifest";

export default class HtmlManifest extends ScopeManifest<"html"> {
  public readonly languageOptions = {
    parser: "html",
    globals: null,
  } as const;
  public readonly parserOptions = { parser: null } as const;
  public readonly processor = {} as const;
  public readonly language = {} as const;
}
