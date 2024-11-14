import type { Scopes, Input } from "..";
import { Ruleset } from "./ruleset";

export class Factory {
  public readonly globalExtension: NonNullable<Input["extensions"]["*"]>;
  public readonly scopeExtensions: Omit<Input["extensions"], "*">;

  constructor(
    public readonly defaults: Input["defaults"],
    { "*": global = {}, ...scopes }: Input["extensions"] = {},
  ) {
    this.globalExtension = global;
    this.scopeExtensions = scopes;
  }

  public get settings() {
    const {
      defaults: { settings },
      globalExtension: {
        noInlineConfig = settings.noInlineConfig,
        reportUnusedDisableDirectives = settings.reportUnusedDisableDirectives,
        sourceType = settings.sourceType,
        ecmaVersion = settings.ecmaVersion,
      },
    } = this;

    return {
      name: "linted/*/settings",
      linterOptions: { noInlineConfig, reportUnusedDisableDirectives },
      languageOptions: { sourceType, ecmaVersion },
    } as const;
  }

  public get ignores() {
    const {
      defaults: { ignores: { "*": defaults } },
      globalExtension: {
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
      scopeExtensions,
    } = this;

    return [
      [...files[scope], ...scopeExtensions[scope]?.files ?? []] as const,
      [...ignores[scope], ...scopeExtensions[scope]?.ignores ?? []] as const,
      new Ruleset(scope, rules[scope], scopeExtensions[scope]?.rules),
    ] as const;
  }
}
