import Option from "../Option.js";

export default class Yml extends Option<
  "yml",
  "yml",
  false,
  true,
  1
> {
  public readonly scope = "yml";
  public readonly processor = {} as const;

  public get languageOptions() {
    try {
      const [parser] = this.parser;

      return { parser } as const;
    }
    catch (e) {
      throw new Error(
        `linted.factory.options.yml: languageOptions`,
        { cause: e },
      );
    }
  }
}
