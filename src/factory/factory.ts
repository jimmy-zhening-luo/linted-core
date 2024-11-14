import type { Scopes, Input } from "..";
import { Ruleset } from "./ruleset";

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

  public get settings() {
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

  public get ignores() {
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

  public scope(scope: Scopes) {
    return [
      [...this.defaultScopes.files[scope], ...this.extendScopes[scope]?.files ?? []] as string[],
      [...this.defaultScopes.ignores[scope], ...this.extendScopes[scope]?.ignores ?? []] as string[],
      new Ruleset(scope, this.defaultScopes.rules[scope], this.extendScopes[scope]?.rules),
    ] as const;
  }
}
