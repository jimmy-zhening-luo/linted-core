import Option from "../Option.js";
import type Ts from "../ts/index.js";

export default class Mocha extends Option<
  "mocha",
  "mocha" | keyof Ts["option"]["plugins"],
  true,
  Ts["option"]["languageOptions"]["parserOptions"],
  1,
  "mocha"
> {
  public readonly scope = "mocha";
  public readonly processor = {} as const;
  public readonly types = ["mocha"] as const;

  public get languageOptions() {
    const [parser] = this.parser,
    globals = this.globals("mocha");

    return {
      ecmaVersion: "latest",
      sourceType: "module",
      parser,
      parserOptions: { project: "tsconfig.json", ecmaVersion: "latest", sourceType: "module" },
      globals,
    } as const;
  }
}
