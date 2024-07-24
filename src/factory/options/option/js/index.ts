import Option from "../Option.js";

export default class JsOption extends Option<"js", "@stylistic"> {
  public readonly scope = "js";
  public readonly processor = {};

  public get languageOptions() {
    return {
      ecmaVersion: "latest",
      sourceType: "module",
    } as const;
  }
}
