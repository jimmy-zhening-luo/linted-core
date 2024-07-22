import Option from "../Option.js";
import type TsOption from "../ts/index.js";

export default class SvelteOption extends Option<
  "svelte",
  "svelte" | keyof TsOption["body"]["plugins"],
  true,
  & TsOption["body"]["languageOptions"]["parserOptions"]
  & { parser: unknown }
  & { extraFileExtensions: [".svelte"] },
  never,
  "svelte/svelte"
> {
  constructor(
    plugins: SvelteOption["body"]["plugins"],
    svelteParser: SvelteOption["body"]["languageOptions"]["parser"],
    tsParser: SvelteOption["body"]["languageOptions"]["parserOptions"]["parser"],
    files: readonly string[],
  ) {
    super(
      {
        name: "linted/scope:svelte",
        processor: "svelte/svelte",
        files,
        plugins,
        linterOptions: {
          noInlineConfig: true,
          reportUnusedDisableDirectives: "error",
        },
        languageOptions: {
          ecmaVersion: "latest",
          sourceType: "module",
          parser: svelteParser,
          parserOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            project: "tsconfig.json",
            extraFileExtensions: [".svelte"],
            parser: tsParser,
          },
        },
      },
    );
  }
}
