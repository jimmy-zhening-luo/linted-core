import Option from "../Option.js";
import type Ts from "../ts/index.js";

export default class Svelte extends Option<
  "svelte",
  "svelte" | keyof Ts["option"]["plugins"],
  true,
  & Ts["option"]["languageOptions"]["parserOptions"]
  & { parser: unknown }
  & { extraFileExtensions: readonly [".svelte"] },
  2,
  never,
  { processor: "svelte/svelte" }
> {
  public readonly scope = "svelte";
  public readonly processor = { processor: "svelte/svelte" } as const;

  public get languageOptions() {
    try {
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
    catch (e) {
      throw new Error(
        `linted.factory.options.svelte: languageOptions`,
        { cause: e },
      );
    }
  }
}
