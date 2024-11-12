import Option from "../option";

export default class Yml extends Option<
  "yml",
  true,
  1
> {
  public readonly scope = "yml";
  public readonly processor = {};
  public readonly language = {};

  public get languageOptions() {
    const [parser] = this.parser;

    return { parser } as const;
  }
}
