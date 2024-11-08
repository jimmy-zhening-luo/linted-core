import Option from "./option";
import type Js from "./js";

export default class Json extends Option<
  "json",
  "json" | keyof Js["option"]["plugins"],
  true,
  false,
  0,
  never,
  never,
  { language: "json/json" }
> {
  public readonly scope = "json";
  public readonly processor = {};
  public readonly language = { language: "json/json" } as const;

  public get languageOptions() {
    return {
      ecmaVersion: "latest",
      sourceType: "module",
    } as const;
  }
}
