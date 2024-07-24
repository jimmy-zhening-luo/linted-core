import Option from "../Option.js";
import type TsOption from "../ts/index.js";

export default class SvelteOption extends Option<
  "svelte",
  "svelte" | keyof TsOption["option"]["plugins"],
  true,
  & TsOption["option"]["languageOptions"]["parserOptions"]
  & { parser: unknown }
  & { extraFileExtensions: readonly [".svelte"] },
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
        ecmaVersion: "latest",
        sourceType: "module",
        project: "tsconfig.json",
        extraFileExtensions: [".svelte"] as const,
        parser: tsParser,
      },
    } as const;
  }
}
