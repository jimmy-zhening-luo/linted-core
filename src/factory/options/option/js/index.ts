import Option from "../index.js";

export default class Js extends Option<"js", "@stylistic"> {
  public readonly scope = "js";
  public readonly processor = {};

  public get languageOptions() {
    return {
      ecmaVersion: "latest",
      sourceType: "module",
    } as const;
  }
}
