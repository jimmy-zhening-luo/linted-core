import { ScopeSettings } from "./settings";
import type { Input } from "../interface";
import type { tree as Tree } from "../scopes";

export class Factory {
  public readonly common;
  public readonly scopes;

  constructor(
    tree: typeof Tree,
    public readonly parsers: Input["imports"]["parsers"],
    {
      settings: defaultSettings,
      files: defaultFiles,
      ignores: defaultIgnores,
      rules: defaultRules,
    }: Input["defaults"],
    { "*": commonExtension = {}, ...scopeExtensions }: Input["extensions"] = {} as const,
  ) {
    const {
      noInlineConfig = defaultSettings.noInlineConfig,
      reportUnusedDisableDirectives = defaultSettings.reportUnusedDisableDirectives,
      sourceType = defaultSettings.sourceType,
      ecmaVersion = defaultSettings.ecmaVersion,
      ignores = [] as const,
      override = false,
    } = commonExtension;

    this.common = {
      settings: {
        name: "linted/*/settings",
        linterOptions: { noInlineConfig, reportUnusedDisableDirectives } as const,
        languageOptions: { sourceType, ecmaVersion } as const,
      } as const,
      ignores: {
        name: "linted/*/ignores",
        ignores: [
          ...override ? [] as const : defaultIgnores["*"],
          ...ignores,
        ] as const,
      } as const,
    } as const;
    this.scopes = {
      files: defaultFiles,
      ignores: defaultIgnores,
      rules: defaultRules,
    } as const;

    for (const scope in scopeExtensions) {
      const {
        [scope as keyof typeof scopeExtensions]: {
          files: moreFiles = [],
          ignores: moreIgnores = [],
          rules: moreRules = null,
        } = {} as const,
      } = scopeExtensions;

      this.scopes.files[scope as keyof typeof scopeExtensions].push(...moreFiles);
      this.scopes.ignores[scope as keyof typeof scopeExtensions].push(...moreIgnores);

      if (moreRules !== null)
        this.scopes.rules[scope as keyof typeof scopeExtensions].push([`${scope}:override`, moreRules]);

      tree.forEach(([scope, parents]) => {
        parents.forEach(parent => {
          this.scopes.files[parent].push(
            ...this.scopes.files[scope],
          );
          this.scopes.ignores[parent].push(
            ...this.scopes.ignores[scope],
          );
        });
      });
    }
  }

  public scope<S extends keyof typeof ScopeSettings>(scope: S) {
    const {
      files: {
        [scope]: files,
      },
      ignores: { [scope]: ignores },
      rules: { [scope]: rules },
    } = this.scopes,
    ruleset = rules.map(([id, rules]) => ({ id: `${scope}/${id}`, rules } as const)),
    settings = new ScopeSettings[scope](),
    { languageOptions, parserOptions } = settings,
    loadedLanguageOptions = {
      ...languageOptions,
      ..."parserOptions" in parserOptions
        ? {
            parserOptions: {
              ...parserOptions.parserOptions,
              ..."parser" in parserOptions.parserOptions
                ? { parser: this.parsers[parserOptions.parserOptions.parser] } as const
                : {} as const,
            } as const,
          } as const
        : {} as const,
      ..."parser" in languageOptions
        ? { parser: this.parsers[languageOptions.parser] } as const
        : {} as const,
    } as const;

    return files.length < 1
      ? [] as const
      : ruleset.length < 1
        ? [] as const
        : [
            {
              name: `linted/${scope}/settings`,
              files,
              ignores,
              languageOptions: loadedLanguageOptions,
              ...settings.processor,
              ...settings.language,
            } as const,
            ...ruleset.map(({ id, rules }) => ({
              name: `linted/${id}`,
              files,
              ignores,
              rules,
            } as const)),
          ];
  }
}
