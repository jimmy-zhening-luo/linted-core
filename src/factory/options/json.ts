import Option from "./option";

export default class Json extends Option<
  "json",
  true,
  1
> {
  public readonly scope = "json";
  public readonly processor = {};
  public readonly language = {};

  public get languageOptions() {
    const [parser] = this.parser;

    return { parser } as const;
  }
}
