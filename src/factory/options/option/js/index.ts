import Option from "../index.js";

export default class JsOption extends Option<"js", "@stylistic"> {
  constructor(
    plugins: JsOption["body"]["plugins"],
    files: readonly string[],
  ) {
    super(
      {
        name: "linted/scope:js",
        files,
        plugins,
        linterOptions: {
          noInlineConfig: true,
          reportUnusedDisableDirectives: "error",
        },
        languageOptions: {
          ecmaVersion: "latest",
          sourceType: "module",
        },
      },
    );
  }
}
