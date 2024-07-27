import Option from "../Option.js";

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
    try {
      const [parser] = this.parser;

      return { parser } as const;
    }
    catch (e) {
      throw new Error(
        `linted.factory.options.json: languageOptions`,
        { cause: e },
      );
    }
  }
}
