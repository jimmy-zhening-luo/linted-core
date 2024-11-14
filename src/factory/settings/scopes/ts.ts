import { ScopeSetting } from "../setting";

export default class Ts extends ScopeSetting<
  "ts",
  {
    readonly project: "tsconfig.json";
    readonly sourceType: "module";
    readonly ecmaVersion: 2023;
  },
  1
> {
  public readonly scope = "ts";
  public readonly processor = {} as const;
  public readonly language = {} as const;

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
