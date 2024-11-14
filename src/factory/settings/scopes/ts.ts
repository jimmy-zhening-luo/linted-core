import { ScopeSetting } from "../setting";

export default class Ts extends ScopeSetting<
  "ts",
  {
    project: "tsconfig.json";
    sourceType: "module";
    ecmaVersion: 2023;
  },
  1
> {
  public readonly scope = "ts";
  public readonly processor = {};
  public readonly language = {};

  public get languageOptions() {
    const [parser] = this.parser;

    return {
      parser,
      parserOptions: {
        project: "tsconfig.json",
        sourceType: "module",
        ecmaVersion: 2023,
      },
    } as const;
  }
}
