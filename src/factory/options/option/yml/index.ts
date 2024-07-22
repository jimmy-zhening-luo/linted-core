import Option from "../Option.js";

export default class YmlOption extends Option<
  "yml",
  "yml",
  true,
  never,
  never,
  never,
  never,
  never
> {
  constructor(
    plugins: YmlOption["body"]["plugins"],
    parser: YmlOption["body"]["languageOptions"]["parser"],
    files: readonly string[],
  ) {
    super(
      {
        name: "linted/scope:yml",
        files,
        plugins,
        linterOptions: {
          noInlineConfig: true,
          reportUnusedDisableDirectives: "error",
        },
        languageOptions: { parser },
      },
    );
  }
}
