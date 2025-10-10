import type { Input } from "./interface";

export class Factory<
  RequiredPlugin extends string,
  RequiredParser extends Scope,
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
    {
      plugins,
      parsers,
    }: Input<
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
    extensions: Input<
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
    } = extensions["*"] ?? {};

    if ("svelte" in extensions && "plugin" in (extensions.svelte as object)) {
      Object.assign(
        plugins,
        {
          svelte: (extensions.svelte as { plugin: unknown }).plugin,
        },
      );
      Object.assign(
        parsers,
        {
          svelte: (extensions.svelte as { parser: unknown }).parser,
        },
      );
    }

    const ignores = extensions["*"]?.override === true
      ? extensions["*"].ignores ?? []
      : defaults.ignores["*"].concat(extensions["*"]?.ignores ?? []);

    this.globalConfigs = {
      plugins: {
        name: "linted/*/plugins/" as const,
        plugins,
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
        ignores,
      },
    };
    this.scopes = {
      files: defaults.files,
      ignores: defaults.ignores,
      rules: defaults.rules,
    };
    this.parsers = parsers;

    const extended = new Set<Scope>(Object.keys(extensions) as unknown[] as readonly Scope[]);

    extended.delete("*" as unknown as Scope);

    for (const scope of extended) {
      const {
        [scope]: {
          files = [],
          ignores = [],
          rules = null,
        } = {},
      } = extensions;

      if (files.length !== 0) {
        const defaultFiles = this.scopes.files[scope],
        fEnd = defaultFiles.length;

        defaultFiles.length += files.length;

        for (let i = 0; i < files.length; i++)
          defaultFiles[fEnd + i] = files[i] as string;
      }

      if (ignores.length !== 0) {
        const defaultIgnores = this.scopes.ignores[scope],
        iEnd = defaultIgnores.length;

        defaultIgnores.length += ignores.length;

        for (let i = 0; i < ignores.length; i++)
          defaultIgnores[iEnd + i] = ignores[i] as string;
      }

      if (rules !== null)
        this.scopes.rules[scope][
          this.scopes.rules[scope].length
        ] = {
          id: scope.concat("/override"),
          rules,
        };
    }

    const OptionalScopes = new Set<Scope>(optionalScopes);

    for (const [scope, parents] of tree)
      if (
        !OptionalScopes.has(scope)
        || scope in this.parsers
      ) {
        const files = this.scopes.files[scope],
        ignores = this.scopes.ignores[scope];

        if (files.length !== 0)
          for (const parent of parents) {
            const parentFiles = this.scopes.files[parent],
            fEnd = parentFiles.length;

            parentFiles.length += files.length;

            for (let i = 0; i < files.length; i++)
              parentFiles[fEnd + i] = files[i] as string;
          }

        if (ignores.length !== 0)
          for (const parent of parents) {
            const parentIgnores = this.scopes.ignores[parent],
            iEnd = parentIgnores.length;

            parentIgnores.length += ignores.length;

            for (let i = 0; i < ignores.length; i++)
              parentIgnores[iEnd + i] = ignores[i] as string;
          }
      }
  }

  public get globals() {
    return [
      this.globalConfigs.plugins,
      this.globalConfigs.settings,
      this.globalConfigs.ignores,
    ];
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
          id: scope.concat(
            "/",
            id,
          ),
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
                && Object.keys(extraLanguageOptions).length === 0
                && Object.keys(extraParserOptions).length === 0
                  ? {}
                  : {
                      languageOptions: {
                        ...extraLanguageOptions,
                        ...parser === null
                          ? {}
                          : {
                              parser: this.parsers[parser as RequiredParser],
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
                                      parser: this.parsers[subparser as RequiredParser],
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
