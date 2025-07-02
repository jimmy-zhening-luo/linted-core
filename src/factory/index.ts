import globals from "globals";
import type { Input } from "../interface";
import type * as Model from "./model";

export class Factory<
  Plugin extends string,
  Parser extends string,
  Scope extends string,
> {
  public global;
  public scopes;

  constructor(
    tree: Model.ITree<Scope>,
    private readonly registry: Record<Scope, Model.IManifest<Parser>>,
    public parsers: Record<Parser, unknown>,
    defaults: Input<Plugin, Parser, Scope>["configuration"]["defaults"],
    {
      "*": globalExtension = {},
      ...scopeExtensions
    }: Input<Plugin, Parser, Scope>["configuration"]["extensions"] = {},
  ) {
    const {
      noInlineConfig = defaults
        .settings
        .noInlineConfig,
      reportUnusedDisableDirectives = defaults
        .settings
        .reportUnusedDisableDirectives,
      sourceType = defaults
        .settings
        .sourceType,
      ecmaVersion = defaults
        .settings
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

    for (const [scope, parents] of tree)
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
        ...languageOptionsStatic
      },
      parserOptions: {
        parser: subparser = null,
        ...parserOptionsStatic
      },
      processor = null,
      language = null,
    } = this.registry[scope];

    if (
      global !== null
      && !(global in globals)
    )
      throw new ReferenceError(
        "Global does not exist",
        { cause: { global } }
      );

    return files.length === 0
      ? []
      : ruleset.length === 0
        ? []
        : [
            {
              name: `linted/${scope as string}/` as const,
              files,
              ignores,
              languageOptions: {
                ...languageOptionsStatic,
                ...global === null
                  ? {}
                  : {
                      globals: globals[global as keyof typeof globals] as Record<string, boolean>,
                    },
                ...parser === null
                  ? {}
                  : {
                      parser: this
                        .parsers[parser],
                    },
                ...Object
                  .keys(parserOptionsStatic)
                  .length < 1
                  && subparser === null
                  ? {}
                  : {
                      parserOptions: {
                        ...parserOptionsStatic,
                        ...subparser === null
                          ? {}
                          : {
                              parser: this
                                .parsers[subparser],
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
