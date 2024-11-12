import type { Input } from "..";

export class GlobalFactory {
  constructor(
    public readonly plugins: Input["imports"]["plugins"],
    public readonly defaultSettings: Input["defaults"]["settings"],
    public readonly defaultGlobalIgnores: Input["defaults"]["ignores"]["*"],
    public readonly globalExtensions: Input["extensions"]["*"] = {},
  ) {}

  public get configs() {
    const {
      plugins,
      defaultSettings,
      defaultGlobalIgnores,
      globalExtensions,
    } = this;

    return [
      {
        name: "linted/*/settings",
        plugins,
        linterOptions: {
          noInlineConfig: globalExtensions?.noInlineConfig ?? defaultSettings.noInlineConfig,
          reportUnusedDisableDirectives: globalExtensions?.reportUnusedDisableDirectives ?? defaultSettings.reportUnusedDisableDirectives,
        },
        languageOptions: {
          sourceType: globalExtensions?.sourceType ?? defaultSettings.sourceType,
          ecmaVersion: globalExtensions?.ecmaVersion ?? defaultSettings.ecmaVersion,
        },
      },
      {
        name: "linted/*/ignores",
        ignores: typeof globalExtensions?.ignores === "undefined" || globalExtensions.ignores.length < 1
          ? defaultGlobalIgnores
          : [
              ...globalExtensions.override === true
                ? []
                : defaultGlobalIgnores,
              ...globalExtensions.ignores,
            ],
      },
    ] as const;
  }
}
