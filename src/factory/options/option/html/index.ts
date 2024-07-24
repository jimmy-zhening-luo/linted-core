import Option from "../Option.js";

export default class HtmlOption extends Option<
  "html",
  "@html-eslint",
  false,
  true,
  1
> {
  public readonly scope = "html";
  public readonly processor = {} as const;

  public get languageOptions() {
    try {
      const [parser] = this.parser;

      return { parser } as const;
    }
    catch (e) {
      throw new Error(
        `linted.factory.options.html: languageOptions`,
        { cause: e },
      );
    }
  }
}
