import { ScopeManifest } from "./manifest";
import type TsManifest from "./ts";

export default class MochaManifest extends ScopeManifest<"ts"> {
  public readonly processor = {} as const;
  public readonly language = {} as const;
  public readonly types = ["mocha"] as const;
  public readonly parserOptions = {
    parser: null,
    project: "tsconfig.json",
    sourceType: "module",
    ecmaVersion: 2023,
  } as const;
  public readonly languageOptions = {
    parser: "ts",
    globals: "mocha",
  } as const;
}
