import Option from "./option";
import type Json from "./json";

export default class Jsonc extends Option<
  "jsonc",
  true,
  ConstructorParameters<typeof Json>[1]["length"]
> {
  public readonly scope = "jsonc";
  public readonly processor = {};
  public readonly language = {};

  public get languageOptions() {
    const [parser] = this.parser;

    return { parser } as const;
  }
}
