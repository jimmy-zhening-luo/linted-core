import { ScopeManifest } from "./manifest";

export default class TsManifest extends ScopeManifest<"ts"> {
  public readonly languageOptions = {
    parser: "ts",
    globals: null,
  } as const;
  public readonly parserOptions = {
    parser: null,
    project: "tsconfig.json",
    sourceType: "module",
    ecmaVersion: 2023,
  } as const;
  public readonly processor = {} as const;
  public readonly language = {} as const;
}
