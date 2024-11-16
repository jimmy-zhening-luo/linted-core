import { ScopeManifest } from "./manifest";
import type TsManifest from "./ts";

export default class MochaManifest extends ScopeManifest<
  "ts",
  TsManifest["parserOptions"],
  "mocha"
> {
  public readonly processor = {} as const;
  public readonly language = {} as const;
  public readonly types = ["mocha"] as const;
  public readonly parserOptions = {
    parserOptions: {
      project: "tsconfig.json",
      sourceType: "module",
      ecmaVersion: 2023,
    } as const,
  } as const;
  public readonly languageOptions = {
    parser: "ts",
    globals: this.globals("mocha"),
  } as const;
}
