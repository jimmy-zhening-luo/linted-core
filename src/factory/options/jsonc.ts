import Option from "./option";

export default class Jsonc extends Option<
  "jsonc",
  true
> {
  public readonly scope = "jsonc";
  public readonly processor = {};
  public readonly language = {};

  public get languageOptions() {
    const [parser] = this.parser;

    return { parser } as const;
  }
}
