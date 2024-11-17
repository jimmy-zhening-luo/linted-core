import { ScopeManifest } from "./manifest";

export default class MochaManifest extends ScopeManifest {
  public readonly languageOptions = {
    parser: null,
    globals: "mocha",
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
