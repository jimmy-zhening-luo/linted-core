import Option from "../Option.js";

export default class YmlOption extends Option<
  "yml",
  "yml",
  false,
  true,
  1
> {
  public readonly name = "scope:yml";
  public readonly processor = {} as const;

  public get languageOptions() {
    const [parser] = this.parser;

    return { parser } as const;
  }
}
