import globals from "globals";
import { ScopeManifests } from "./manifests";
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
    {
      "*": commonExtension = {},
      ...scopeExtensions
    }: Input["extensions"] = {} as const,
  ) {
    const {
      noInlineConfig = defaultSettings.noInlineConfig,
      reportUnusedDisableDirectives = defaultSettings.reportUnusedDisableDirectives,
      sourceType = defaultSettings.sourceType,
      ecmaVersion = defaultSettings.ecmaVersion,
      ignores = [],
      override = false,
    } = commonExtension;

    this.common = {
      settings: {
        name: "linted/*/",
        linterOptions: { noInlineConfig, reportUnusedDisableDirectives } as const,
        languageOptions: { sourceType, ecmaVersion } as const,
      } as const,
      ignores: {
        name: "linted/*/ignores/",
        ignores: [
          ...override ? [] : defaultIgnores["*"],
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
        this.scopes.rules[scope as keyof typeof scopeExtensions].push([`${scope}/override`, moreRules] as const);
    }

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

  public scope<S extends keyof typeof ScopeManifests>(scope: S) {
    const {
      files: { [scope]: files },
      ignores: { [scope]: ignores },
      rules: { [scope]: rules },
    } = this.scopes,
    ruleset = rules.map(([id, rules]) => ({ id: `${scope}/${id}`, rules } as const)),
    {
      processor,
      language,
      languageOptions: {
        parser = null,
        globals: global = null,
        ...languageOptionsStatic
      },
      parserOptions: {
        parser: subparser = null,
        ...parserOptionsStatic
      },
    } = new ScopeManifests[scope]();

    return files.length < 1
      ? [] as const
      : ruleset.length < 1
        ? [] as const
        : [
            {
              name: `linted/${scope}/`,
              files,
              ignores,
              ...processor,
              ...language,
              languageOptions: {
                ...languageOptionsStatic,
                ...global !== null && global in globals ? { globals: globals[global as keyof typeof globals] } as const : {} as const,
                ...parser === null ? {} as const : { parser: this.parsers[parser] } as const,
                ...Object.keys(parserOptionsStatic).length < 1 && subparser === null
                  ? {} as const
                  : {
                      parserOptions: {
                        ...parserOptionsStatic,
                        ...subparser === null ? {} as const : { parser: this.parsers[subparser] } as const,
                      } as const,
                    } as const,
              } as const,
            } as const,
            ...ruleset.map(({ id, rules }) => ({
              name: `linted/${id}/`,
              files,
              ignores,
              rules,
            } as const)),
          ];
  }
}
