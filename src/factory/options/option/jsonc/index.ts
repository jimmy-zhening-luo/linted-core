import Option from "../Option.js";

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
    try {
      const [parser] = this.parser;

      return { parser } as const;
    }
    catch (e) {
      throw new Error(
        `linted.factory.options.jsonc: languageOptions`,
        { cause: e },
      );
    }
  }
}
