import { ScopeSetting } from "../setting";

export default class YmlSetting extends ScopeSetting<
  "yml"
> {
  public readonly scope = "yml";
  public readonly processor = {} as const;
  public readonly language = {} as const;
  public readonly parserOptions = {} as const;
  public readonly languageOptions = { parser: "yml" } as const;
}
