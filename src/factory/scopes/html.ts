import { ScopeSetting } from "./setting";

export default class HtmlSetting extends ScopeSetting<
  "html"
> {
  public readonly processor = {} as const;
  public readonly language = {} as const;
  public readonly parserOptions = {} as const;
  public readonly languageOptions = { parser: "html" } as const;
}
