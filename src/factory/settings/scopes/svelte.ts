import { ScopeSetting } from "../setting";
import type TsSetting from "./ts";

export default class SvelteSetting extends ScopeSetting<
  "svelte",
  {
    readonly parser: unknown;
    readonly extraFileExtensions: readonly [".svelte"];
  } & TsSetting["option"]["languageOptions"]["parserOptions"],
  2,
  false,
  { readonly processor: "svelte/svelte" }
> {
  public readonly scope = "svelte";
  public readonly processor = { processor: "svelte/svelte" } as const;
  public readonly language = {} as const;

  public get languageOptions() {
    const [parser, tsParser] = this.parser;

    return {
      parser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".svelte"] as const,
        project: "tsconfig.json",
        sourceType: "module",
        ecmaVersion: 2023,
      } as const,
    } as const;
  }
}
