import { ScopeSetting } from "../setting";

export default class JsonSetting extends ScopeSetting<
  "jsonc"
> {
  public readonly scope = "json";
  public readonly processor = {} as const;
  public readonly language = {} as const;
  public readonly parserOptions = {} as const;
  public readonly languageOptions = { parser: "jsonc" } as const;
}
