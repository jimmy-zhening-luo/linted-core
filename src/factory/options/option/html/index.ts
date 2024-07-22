import Option from "../index.js";

export default class HtmlOption extends Option<
  "html",
  "@html-eslint",
  true,
  never,
  never,
  never,
  never,
  never
> {
  constructor(
    plugins: HtmlOption["body"]["plugins"],
    parser: HtmlOption["body"]["languageOptions"]["parser"],
    files: readonly string[],
  ) {
    super(
      {
        name: "linted/scope:html",
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
