import { ScopeSetting } from "../setting";

export default class JsoncSetting extends ScopeSetting<
  "jsonc",
  true
> {
  public readonly scope = "jsonc";
  public readonly processor = {} as const;
  public readonly language = {} as const;

  public get languageOptions() {
    const [parser] = this.parser;

    return { parser } as const;
  }
}
