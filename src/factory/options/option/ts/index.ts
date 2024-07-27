import Option from "../Option.js";
import type Js from "../js/index.js";

export default class Ts extends Option<
  "ts",
  "@typescript-eslint" | keyof Js["option"]["plugins"],
  true,
  & Js["option"]["languageOptions"]
  & { project: "tsconfig.json" },
  1
> {
  public readonly scope = "ts";
  public readonly processor = {} as const;

  public get languageOptions() {
    try {
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
    catch (e) {
      throw new Error(
        `linted.factory.options.ts: languageOptions`,
        { cause: e },
      );
    }
  }
}
