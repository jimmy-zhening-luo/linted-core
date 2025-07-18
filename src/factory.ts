import globals from "globals";
import type { Input } from "./interface";

export class Factory<
  RequiredPlugin extends string,
  RequiredParser extends string,
  OptionalImport extends string,
  Scope extends string,
> {
  public global;
  public scopes;

  constructor(
    optionalScopes: readonly Scope[],
    tree: Array<
      readonly [
        Scope,
        readonly Scope[],
      ]
    >,
    private readonly settings: Input<
      RequiredPlugin,
      RequiredParser,
      OptionalImport,
      Scope
    >["configuration"]["settings"],
    public parsers: Record<
      RequiredParser,
      unknown
    > & Partial<
      Record<
        OptionalImport,
        unknown
      >
    >,
    defaults: Input<
      RequiredPlugin,
      RequiredParser,
      OptionalImport,
      Scope
    >["configuration"]["defaults"],
    {
      "*": globalExtension = {},
      ...scopeExtensions
    }: Input<
      RequiredPlugin,
      RequiredParser,
      OptionalImport,
      Scope
    >["configuration"]["extensions"] = {},
    public readonly attachments: Input<
      RequiredPlugin,
      RequiredParser,
      OptionalImport,
      Scope
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
    } = globalExtension,
    {
      ignores = [],
      override = false,
    } = globalExtension;

    this.global = {
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
          ...override
            ? []
            : defaults
              .ignores["*"],
          ...ignores,
        ],
      },
    };
    this.scopes = {
      files: defaults
        .files,
      ignores: defaults
        .ignores,
      rules: defaults
        .rules,
    };

    for (const scope in scopeExtensions) {
      const {
        [scope as keyof typeof scopeExtensions]: {
          files: userFiles = [],
          ignores: userIgnores = [],
          rules: userRules = null,
        } = {},
      } = scopeExtensions;

      this
        .scopes
        .files[scope as keyof typeof scopeExtensions]
        .push(...userFiles);
      this
        .scopes
        .ignores[scope as keyof typeof scopeExtensions]
        .push(...userIgnores);

      if (userRules !== null)
        this
          .scopes
          .rules[scope as keyof typeof scopeExtensions]
          .push(
            {
              id: scope + "/override",
              rules: userRules,
            },
          );
    }

    const OptionalScopes = new Set<Scope>(
      optionalScopes,
    );

    for (const [scope, parents] of tree)
      if (
        !OptionalScopes.has(scope)
        || scope in parsers
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
      this.global.settings,
      this.global.ignores,
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
        ) => {
          return {
            id: [
              scope,
              id,
            ]
              .join("/"),
            rules,
          };
        },
      ),
    {
      languageOptions: {
        parser = null,
        globals: global = null,
        ...extraLanguageOptions
      },
      parserOptions: {
        parser: subparser = null,
        ...extraParserOptions
      },
      processor = null,
      language = null,
    } = this.settings.registry[scope];

    function isGlobal(
      global: string,
    ): global is keyof typeof globals {
      return global in globals;
    }

    if (
      global !== null
      && !isGlobal(global)
    )
      throw new ReferenceError(
        "Global does not exist",
        { cause: { global } },
      );

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
                && global === null
                && subparser === null
                && [...Object.keys(extraLanguageOptions)].length === 0
                && [...Object.keys(extraParserOptions)].length === 0
                  ? {}
                  : {
                      languageOptions: {
                        ...extraLanguageOptions,
                        ...global === null
                          ? {}
                          : {
                              globals: globals[global],
                            },
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
                ) => {
                  return {
                    name: `linted/${id}/` as const,
                    files,
                    ignores,
                    rules,
                  };
                },
              ),
            ];
  }
}
