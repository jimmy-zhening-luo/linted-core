import Option from "../index.js";

export default class Jsonc extends Option<
  "jsonc",
  "jsonc",
  false,
  true,
  1
> {
  public readonly scope = "jsonc";
  public readonly processor = {} as const;

  public get languageOptions() {
    const [parser] = this.parser;

    return { parser } as const;
  }
}
