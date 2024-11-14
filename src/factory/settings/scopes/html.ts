import { ScopeSetting } from "../setting";

export default class Html extends ScopeSetting<
  "html",
  true
> {
  public readonly scope = "html";
  public readonly processor = {} as const;
  public readonly language = {} as const;

  public get languageOptions() {
    const [parser] = this.parser;

    return { parser } as const;
  }
}
