import Option from "./option";
import type Json from "./json";

export default class Jsonc extends Option<
  "jsonc",
  keyof Json["plugins"],
  true,
  false,
  ConstructorParameters<typeof Json>[1]["length"],
  never,
  never,
  { language: "json/jsonc" }
> {
  public readonly scope = "jsonc";
  public readonly processor = {};
  public readonly language = { language: "json/jsonc" } as const;

  public get languageOptions() {
    return {
      allowTrailingCommas: true,
      ecmaVersion: "latest",
      sourceType: "module",
    } as const;
  }
}
