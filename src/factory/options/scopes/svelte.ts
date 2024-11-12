import Option from "../option";
import type Ts from "./ts";

export default class Svelte extends Option<
  "svelte",
  {
    parser: unknown;
    extraFileExtensions: readonly [".svelte"];
  } & Ts["option"]["languageOptions"]["parserOptions"],
  2,
  false,
  { processor: "svelte/svelte" }
> {
  public readonly scope = "svelte";
  public readonly processor = { processor: "svelte/svelte" } as const;
  public readonly language = {};

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
      },
    } as const;
  }
}
