import { ScopeSetting } from "../setting";
import type Ts from "./ts";

export default class Mocha extends ScopeSetting<
  "mocha",
  Ts["option"]["languageOptions"]["parserOptions"],
  1,
  "mocha"
> {
  public readonly scope = "mocha";
  public readonly processor = {};
  public readonly language = {};
  public readonly types = ["mocha"] as const;

  public get languageOptions() {
    const [parser] = this.parser,
    globals = this.globals("mocha");

    return {
      parser,
      parserOptions: {
        project: "tsconfig.json",
        sourceType: "module",
        ecmaVersion: 2023,
      },
      globals,
    } as const;
  }
}
