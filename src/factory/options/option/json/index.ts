import Option from "../index.js";

export default class Json extends Option<
  "json",
  "jsonc",
  false,
  true,
  1
> {
  public readonly scope = "json";
  public readonly processor = {} as const;

  public get languageOptions() {
    const [parser] = this.parser;

    return { parser } as const;
  }
}
