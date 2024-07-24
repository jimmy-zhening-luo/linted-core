import Option from "../Option.js";
import type JsOption from "../js/index.js";

export default class TsOption extends Option<
  "ts",
  "@typescript-eslint" | keyof JsOption["option"]["plugins"],
  true,
  & JsOption["option"]["languageOptions"]
  & { project: "tsconfig.json" },
  1
> {
  public readonly name = "scope:ts";
  public readonly processor = {} as const;

  public get languageOptions() {
    const [parser] = this.parser;

    return {
      ecmaVersion: "latest",
      sourceType: "module",
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "tsconfig.json",
      },
    } as const;
  }
}
