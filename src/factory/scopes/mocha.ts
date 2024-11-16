import { ScopeSetting } from "./setting";
import type TsSetting from "./ts";

export default class MochaSetting extends ScopeSetting<
  "ts",
  TsSetting["parserOptions"],
  "mocha"
> {
  public readonly scope = "mocha";
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
