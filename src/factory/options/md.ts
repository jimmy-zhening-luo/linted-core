import Option from "./option";

export default class Md extends Option<
  "md",
  "markdownlint",
  false,
  true,
  1
> {
  public readonly scope = "md";
  public readonly processor = {} as const;

  public get languageOptions() {
    const [parser] = this.parser;

    return { parser } as const;
  }
}
