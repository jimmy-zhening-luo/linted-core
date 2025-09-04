import type { Input } from "./interface";

export class Factory<
  RequiredPlugin extends string,
  RequiredParser extends string,
  Scope extends string,
  OptionalScope extends Scope,
> {
  public globalConfigs;
  public scopes;
  public parsers;

  constructor(
    tree: Array<
      readonly [
        Scope,
        readonly Scope[],
      ]
    >,
    optionalScopes: readonly Scope[],
    imports: Input<
      RequiredPlugin,
      RequiredParser,
      Scope,
      OptionalScope
    >["imports"],
    private readonly settings: Input<
      RequiredPlugin,
      RequiredParser,
      Scope,
      OptionalScope
    >["configuration"]["settings"],
    defaults: Input<
      RequiredPlugin,
      RequiredParser,
      Scope,
      OptionalScope
    >["configuration"]["defaults"],
    {
      "*": globalExtension = {},
      ...scopeExtensions
    }: Input<
      RequiredPlugin,
      RequiredParser,
      Scope,
      OptionalScope
    >["configuration"]["extensions"] = {},
    public readonly attachments: Input<
      RequiredPlugin,
      RequiredParser,
      Scope,
      OptionalScope
    >["configuration"]["attachments"] = [],
  ) {
    const {
      noInlineConfig = settings
        .global
        .noInlineConfig,
      reportUnusedDisableDirectives = settings
        .global
        .reportUnusedDisableDirectives,
      sourceType = settings
        .global
        .sourceType,
      ecmaVersion = settings
        .global
        .ecmaVersion,
    } = globalExtension;

    this.globalConfigs = {
      plugins: {
        name: "linted/*/plugins/" as const,
        plugins: {
          ...imports.plugins,
          ..."svelte" in scopeExtensions && "plugin" in scopeExtensions.svelte
            ? {
                svelte: scopeExtensions.svelte.plugin,
              }
            : {},
        },
      },
      settings: {
        name: "linted/*/settings/" as const,
        linterOptions: {
          noInlineConfig,
          reportUnusedDisableDirectives,
        },
        languageOptions: {
          sourceType,
          ecmaVersion,
        },
      },
      ignores: {
        name: "linted/*/ignores/" as const,
        ignores: [
          ...globalExtension.override
            ? []
            : defaults.ignores["*"],
          ...globalExtension.ignores ?? [],
        ],
      },
    };
    this.scopes = {
      files: defaults.files,
      ignores: defaults.ignores,
      rules: defaults.rules,
    };
    this.parsers = {
      ...imports.parsers,
      ..."svelte" in scopeExtensions && "parser" in scopeExtensions.svelte
        ? {
            svelte: scopeExtensions.svelte.parser,
          }
        : {},
    }

    for (const scope in scopeExtensions) {
      const {
        [scope as keyof typeof scopeExtensions]: {
          files = [],
          ignores = [],
          rules = null,
        } = {},
      } = scopeExtensions;

      this
        .scopes
        .files[scope as keyof typeof scopeExtensions]
        .push(...files);
      this
        .scopes
        .ignores[scope as keyof typeof scopeExtensions]
        .push(...ignores);

      if (rules !== null)
        this
          .scopes
          .rules[scope as keyof typeof scopeExtensions]
          .push(
            {
              id: scope + "/override",
              rules,
            },
          );
    }

    const OptionalScopes = new Set<Scope>(optionalScopes);

    for (const [scope, parents] of tree)
      if (
        !OptionalScopes.has(scope)
        || scope in this.parsers
      )
        for (const parent of parents) {
          this
            .scopes
            .files[parent]
            .push(
              ...this
                .scopes
                .files[scope],
            );
          this
            .scopes
            .ignores[parent]
            .push(
              ...this
                .scopes
                .ignores[scope],
            );
        }
  }

  public get globals() {
    return [
      this.globalConfigs.plugins,
      this.globalConfigs.settings,
      this.globalConfigs.ignores,
    ] as const;
  }

  public scope(scope: Scope) {
    const {
      files: {
        [scope]: files,
      },
      ignores: {
        [scope]: ignores,
      },
      rules: {
        [scope]: rules,
      },
    } = this.scopes,
    ruleset = rules
      .map(
        (
          {
            id,
            rules,
          },
        ) => ({
          id: [
            scope,
            id,
          ]
            .join("/"),
          rules,
        }),
      ),
    {
      languageOptions: {
        parser = null,
        ...extraLanguageOptions
      },
      parserOptions: {
        parser: subparser = null,
        ...extraParserOptions
      },
      processor = null,
      language = null,
    } = this.settings.registry[scope];

    return files.length === 0
      ? []
      : ruleset.length === 0
        ? []
        : parser !== null
          && !(parser in this.parsers)
          || subparser !== null
          && !(subparser in this.parsers)
          ? []
          : [
              {
                name: `linted/${scope as string}/` as const,
                files,
                ignores,
                ...parser === null
                && subparser === null
                && [...Object.keys(extraLanguageOptions)].length === 0
                && [...Object.keys(extraParserOptions)].length === 0
                  ? {}
                  : {
                      languageOptions: {
                        ...extraLanguageOptions,
                        ...parser === null
                          ? {}
                          : {
                              parser: this.parsers[parser],
                            },
                        ...subparser === null
                        && [...Object.keys(extraParserOptions)].length === 0
                          ? {}
                          : {
                              parserOptions: {
                                ...extraParserOptions,
                                ...subparser === null
                                  ? {}
                                  : {
                                      parser: this.parsers[subparser],
                                    },
                              },
                            },
                      },
                    },
                ...processor === null
                  ? {}
                  : { processor },
                ...language === null
                  ? {}
                  : { language },
              },
              ...ruleset.map(
                (
                  {
                    id,
                    rules,
                  },
                ) => ({
                  name: `linted/${id}/` as const,
                  files,
                  ignores,
                  rules,
                }),
              ),
            ];
  }
}
