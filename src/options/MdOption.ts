import Option from "./option/Option.js";

export default class MdOption extends Option<
  "md",
  "yml",
  true,
  never,
  never,
  never,
  never,
  never
> {
  constructor(
    plugins: MdOption["body"]["plugins"],
    parser: MdOption["body"]["languageOptions"]["parser"],
    ...files: string[]
  ) {
    super(
      {
        name: "linted/scope:md",
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
