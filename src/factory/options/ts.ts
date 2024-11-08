import Option from "./option";

export default class Ts extends Option<
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
