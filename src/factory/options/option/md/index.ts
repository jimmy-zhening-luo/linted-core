import Option from "../Option.js";

export default class Md extends Option<
  "md",
  "markdownlint",
  false,
  true,
  1
> {
  public readonly scope = "md";
  public readonly processor = {} as const;

  public get languageOptions() {
    try {
      const [parser] = this.parser;

      return { parser } as const;
    }
    catch (e) {
      throw new Error(
        `linted.factory.options.md: languageOptions`,
        { cause: e },
      );
    }
  }
}
