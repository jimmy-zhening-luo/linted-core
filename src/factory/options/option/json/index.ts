import Option from "../Option.js";

export default class JsonOption extends Option<
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
