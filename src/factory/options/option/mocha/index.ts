import Option from "../Option.js";
import type Ts from "../ts/index.js";

export default class Mocha extends Option<
  "mocha",
  "mocha" | keyof Ts["option"]["plugins"],
  true,
  & Ts["option"]["languageOptions"]["parserOptions"],
  1,
  "mocha"
> {
  public readonly scope = "mocha";
  public readonly processor = {} as const;
  public readonly types = ["mocha"] as const;

  public get languageOptions() {
    try {
      const [parser] = this.parser,
      globals = this.globals("mocha");

      return {
        ecmaVersion: "latest",
        sourceType: "module",
        parser,
        parserOptions: {
          ecmaVersion: "latest",
          sourceType: "module",
          project: "tsconfig.json",
        },
        globals,
      } as const;
    }
    catch (e) {
      throw new Error(
        `linted.factory.options.mocha: languageOptions`,
        { cause: e },
      );
    }
  }
}
