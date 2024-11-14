import { ScopeSetting } from "../setting";

export default class JsonSetting extends ScopeSetting<
  "json",
  true
> {
  public readonly scope = "json";
  public readonly processor = {} as const;
  public readonly language = {} as const;

  public get languageOptions() {
    const [parser] = this.parser;

    return { parser } as const;
  }
}
