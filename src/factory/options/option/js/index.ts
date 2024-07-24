import Option from "../Option.js";

export default class JsOption extends Option<"js", "@stylistic"> {
  public readonly scope = "js";
  public readonly processor = {};

  public get languageOptions() {
    try {
      return {
        ecmaVersion: "latest",
        sourceType: "module",
      } as const;
    }
    catch (e) {
      throw new Error(
        `linted.factory.options.js: languageOptions`,
        { cause: e },
      );
    }
  }
}
