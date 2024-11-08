import Option from "./option";
import type Js from "./js";

export default class Ts extends Option<
  "ts",
  "@typescript-eslint" | keyof Js["option"]["plugins"],
  true,
  { project: "tsconfig.json" } & Js["option"]["languageOptions"],
  1
> {
  public readonly scope = "ts";
  public readonly processor = {};
  public readonly language = {};

  public get languageOptions() {
    const [parser] = this.parser;

    return {
      ecmaVersion: "latest",
      sourceType: "module",
      parser,
      parserOptions: { project: "tsconfig.json", ecmaVersion: "latest", sourceType: "module" },
    } as const;
  }
}
