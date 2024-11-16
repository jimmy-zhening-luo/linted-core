import { ScopeManifest } from "./manifest";

export default class TsManifest extends ScopeManifest<
  "ts",
  {
    parserOptions: {
      readonly project: "tsconfig.json";
      readonly sourceType: "module";
      readonly ecmaVersion: 2023;
    };
  }
> {
  public readonly processor = {} as const;
  public readonly language = {} as const;
  public readonly parserOptions = {
    parserOptions: {
      project: "tsconfig.json",
      sourceType: "module",
      ecmaVersion: 2023,
    } as const,
  } as const;
  public readonly languageOptions = {
    parser: "ts",

  } as const;
}
