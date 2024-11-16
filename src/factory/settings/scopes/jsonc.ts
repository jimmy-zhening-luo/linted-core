import { ScopeSetting } from "../setting";

export default class JsoncSetting extends ScopeSetting<
  "jsonc"
> {
  public readonly scope = "jsonc";
  public readonly processor = {} as const;
  public readonly language = {} as const;
  public readonly parserOptions = {} as const;
  public readonly languageOptions = { parser: "jsonc" } as const;
}
