import type { Scopes, Input } from "..";
import { Ruleset } from "./ruleset";
import type Options from "./settings";

export class Factory {
  public readonly extensions: {
    readonly global: NonNullable<Input["extensions"]["*"]>;
    readonly scopes: Omit<Input["extensions"], "*">;
  };

  constructor(
    public readonly defaults: Input["defaults"],
    { "*": global = {}, ...scopes }: Input["extensions"] = {} as const,
  ) {
    this.extensions = { global, scopes } as const;
  }

  public get settings() {
    const {
      defaults: { settings },
      extensions: {
        global: {
          noInlineConfig = settings.noInlineConfig,
          reportUnusedDisableDirectives = settings.reportUnusedDisableDirectives,
          sourceType = settings.sourceType,
          ecmaVersion = settings.ecmaVersion,
        },
      },
    } = this;

    return {
      name: "linted/*/settings",
      linterOptions: { noInlineConfig, reportUnusedDisableDirectives } as const,
      languageOptions: { sourceType, ecmaVersion } as const,
    } as const;
  }

  public get ignores() {
    const {
      defaults: { ignores: { "*": defaults } },
      extensions: {
        global: {
          ignores = [] as const,
          override = false,
        },
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

  public scope<S extends Scopes>(scope: S, settings: InstanceType<typeof Options[S]>) {
    const {
      defaults: {
        files: { [scope]: defaultFiles },
        ignores: { [scope]: defaultIgnores },
        rules: { [scope]: defaultRules },
      },
      extensions: { scopes: { [scope]: scopeExtension = {} as const } },
    } = this,
    {
      files: extendFiles = [] as const,
      ignores: extendIgnores = [] as const,
      rules: extendRules,
    } = scopeExtension,
    files = [...defaultFiles, ...extendFiles] as const,
    ignores = [...defaultIgnores, ...extendIgnores] as const,
    ruleset = new Ruleset(scope, defaultRules, extendRules);

    if (ruleset.scope !== settings.scope)
      throw new TypeError(`Scope mismatch between config "${settings.scope} and inner ruleset "${ruleset.scope}"`);

    return files.length < 1
      ? [] as const
      : ruleset.ruleset.map(({ id, rules }) => ({
        name: `linted/${id}`,
        files,
        ignores,
        rules,
        ...settings.option,
      } as const));
  }
}
