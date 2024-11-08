import Option from "./option";

export default class Jsonc extends Option<
  "jsonc",
  "json",
  true,
  false,
  0,
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
