import Option from "./option";
import type Ts from "./ts";

export default class Svelte extends Option<
  "svelte",
  "svelte" | keyof Ts["option"]["plugins"],
  true,
  { parser: unknown } & { extraFileExtensions: readonly [".svelte"] } & Ts["option"]["languageOptions"]["parserOptions"],
  2,
  never,
  { processor: "svelte/svelte" }
> {
  public readonly scope = "svelte";
  public readonly processor = { processor: "svelte/svelte" } as const;

  public get languageOptions() {
    const [parser, tsParser] = this.parser;

    return {
      ecmaVersion: "latest",
      sourceType: "module",
      parser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".svelte"] as const,
        project: "tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
    } as const;
  }
}
