import Option from "./option";

export default class Html extends Option<
  "html",
  true,
  1
> {
  public readonly scope = "html";
  public readonly processor = {};
  public readonly language = {};

  public get languageOptions() {
    const [parser] = this.parser;

    return { parser } as const;
  }
}
