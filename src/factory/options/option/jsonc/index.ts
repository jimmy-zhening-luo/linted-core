import Option from "../Option.js";

export default class JsoncOption extends Option<
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
