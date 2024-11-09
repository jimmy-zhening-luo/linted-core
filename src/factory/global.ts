import type { Input } from ".";

export class Global {
  constructor(
    public readonly plugins: Input["plugins"],
    public readonly settings: Input["settings"],
    public readonly globals: Input["globals"],
  ) {}

  public get configs() {
    const {
      plugins,
      settings,
      globals,
    } = this;

    return [
      {
        name: "linted/global/settings",
        plugins,
        linterOptions: {
          noInlineConfig: settings.noInlineConfig,
          reportUnusedDisableDirectives: settings.reportUnusedDisableDirectives,
        },
        languageOptions: {
          sourceType: settings.sourceType,
          ecmaVersion: settings.ecmaVersion,
        },
      },
      {
        name: "linted/global/ignores",
        ignores: typeof globals.extend.ignores === "undefined" || globals.extend.ignores.length < 1
          ? globals.ignores.ignores
          : [
              ...globals.extend.inherit === false
                ? []
                : globals.ignores.ignores,
              ...globals.extend.ignores,
            ],
      },
    ] as const;
  }
}