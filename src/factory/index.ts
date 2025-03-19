import globals from "globals";
import { ScopeManifests } from "./manifests";
import type { Input } from "../interface";
import type { tree as Tree } from "../scope";

export class Factory {
  public readonly global;
  public readonly scopes;

  constructor(
    tree: typeof Tree,
    public readonly parsers: Input["imports"]["parsers"],
    defaults: Input["defaults"],
    {
      "*": globalExtension = {},
      ...scopeExtensions
    }: Input["extensions"] = {} as const,
  ) {
    const {
      noInlineConfig = defaults.settings.noInlineConfig,
      reportUnusedDisableDirectives = defaults.settings.reportUnusedDisableDirectives,
      sourceType = defaults.settings.sourceType,
      ecmaVersion = defaults.settings.ecmaVersion,
      ignores = [],
      override = false,
    } = globalExtension;

    this.global = {
      settings: {
        name: "linted/*/settings/",
        linterOptions: { noInlineConfig, reportUnusedDisableDirectives } as const,
        languageOptions: { sourceType, ecmaVersion } as const,
      } as const,
      ignores: {
        name: "linted/*/ignores/",
        ignores: [
          ...override ? [] : defaults.ignores["*"],
          ...ignores,
        ] as const,
      } as const,
    } as const;
    this.scopes = {
      files: defaults.files,
      ignores: defaults.ignores,
      rules: defaults.rules,
    } as const;

    for (const scope in scopeExtensions) {
      const {
        [scope as keyof typeof scopeExtensions]: {
          files: userFiles = [],
          ignores: userIgnores = [],
          rules: userRules = null,
        } = {} as const,
      } = scopeExtensions;

      this.scopes.files[scope as keyof typeof scopeExtensions].push(...userFiles);
      this.scopes.ignores[scope as keyof typeof scopeExtensions].push(...userIgnores);

      if (userRules !== null)
        this.scopes.rules[scope as keyof typeof scopeExtensions].push({ id: `${scope}/override`, rules: userRules } as const);
    }

    for (const [scope, parents] of tree)
      for (const parent of parents) {
        this.scopes.files[parent].push(
          ...this.scopes.files[scope],
        );
        this.scopes.ignores[parent].push(
          ...this.scopes.ignores[scope],
        );
      }
  }

  public get globals() {
    const {
      settings,
      ignores,
    } = this.global;

    return [
      settings,
      ignores,
    ] as const;
  }

  public scope<S extends keyof typeof ScopeManifests>(scope: S) {
    const {
      files: { [scope]: files },
      ignores: { [scope]: ignores },
      rules: { [scope]: rules },
    } = this.scopes,
    ruleset = rules.map(({ id, rules }) => ({ id: `${scope}/${id}`, rules } as const)),
    {
      languageOptions: {
        parser = null,
        globals: global = null,
        ...languageOptionsStatic
      },
      parserOptions: {
        parser: subparser = null,
        ...parserOptionsStatic
      },
      processor,
      language,
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
              ...processor,
              ...language,
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
