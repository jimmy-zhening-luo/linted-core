import { ScopeSetting } from "../setting";

export default class YmlSetting extends ScopeSetting<
  "yml",
  true,
  1
> {
  public readonly scope = "yml";
  public readonly processor = {} as const;
  public readonly language = {} as const;

  public get languageOptions() {
    const [parser] = this.parser;

    return { parser } as const;
  }
}
