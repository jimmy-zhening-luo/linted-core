import type { Input } from "..";

export class Factory {
  public readonly extendGlobal: NonNullable<Input["extensions"]["*"]>;
  public readonly extendScopes: Omit<Input["extensions"], "*">;

  constructor(
    public readonly defaultGlobalSettings: Input["defaults"]["settings"],
    public readonly defaultGlobalIgnores: Input["defaults"]["ignores"]["*"],
    public readonly defaultScopes: Pick<Input["defaults"], "files" | "ignores" | "rules">,
    { "*": globals = {}, ...scopes }: Input["extensions"] = {},
  ) {
    this.extendGlobal = globals;
    this.extendScopes = scopes;
  }

  public get globalSettings() {
    const {
      defaultGlobalSettings: defaults,
      extendGlobal: {
        noInlineConfig = defaults.noInlineConfig,
        reportUnusedDisableDirectives = defaults.reportUnusedDisableDirectives,
        sourceType = defaults.sourceType,
        ecmaVersion = defaults.ecmaVersion,
      },
    } = this;

    return {
      name: "linted/*/settings",
      linterOptions: {
        noInlineConfig,
        reportUnusedDisableDirectives,
      },
      languageOptions: {
        sourceType,
        ecmaVersion,
      },
    } as const;
  }

  public get globalIgnores() {
    const {
      defaultGlobalIgnores: defaults,
      extendGlobal: {
        ignores = [] as const,
        override = false,
      },
    } = this;

    return {
      name: "linted/*/ignores",
      ignores: [
        ...override ? [] as const : defaults,
        ...ignores,
      ] as const,
    } as const;
  }
}
