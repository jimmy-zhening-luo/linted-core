import Option from "./option";

export default class Yml extends Option<
  "yml",
  "yml",
  false,
  true,
  1
> {
  public readonly scope = "yml";
  public readonly processor = {} as const;

  public get languageOptions() {
    const [parser] = this.parser;

    return { parser } as const;
  }
}
