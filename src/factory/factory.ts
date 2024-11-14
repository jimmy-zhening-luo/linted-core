import type { Scopes, Input } from "..";
import { Ruleset } from "./ruleset";

export class Factory {
  public readonly extendGlobal: NonNullable<Input["extensions"]["*"]>;
  public readonly extendScopes: Omit<Input["extensions"], "*">;

  constructor(
    public readonly defaults: Input["defaults"],
    { "*": extendGlobal = {}, ...extendScopes }: Input["extensions"] = {},
  ) {
    this.extendGlobal = extendGlobal;
    this.extendScopes = extendScopes;
  }

  public get settings() {
    const {
      defaults: {
        settings,
      },
      extendGlobal: {
        noInlineConfig = settings.noInlineConfig,
        reportUnusedDisableDirectives = settings.reportUnusedDisableDirectives,
        sourceType = settings.sourceType,
        ecmaVersion = settings.ecmaVersion,
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
      defaults: {
        ignores: {
          "*": defaults,
        },
      },
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
    const {
      defaults: { files, ignores, rules },
      extendScopes,
    } = this;

    return [
      [...files[scope], ...extendScopes[scope]?.files ?? []] as string[],
      [...ignores[scope], ...extendScopes[scope]?.ignores ?? []] as string[],
      new Ruleset(scope, rules[scope], extendScopes[scope]?.rules),
    ] as const;
  }
}
