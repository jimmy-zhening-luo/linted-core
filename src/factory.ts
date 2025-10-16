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
        name: "linted/*/plugins",
        plugins,
      },
      ignores: {
        name: "linted/*/ignores",
        ignores,
      },
    };
    this.scopes = {
      files: defaults.files,
      ignores: defaults.ignores,
      rules: defaults.rules,
    };
    this.parsers = parsers;

    const extended = new Set<Scope>(Object.keys(extensions) as unknown[] as Scope[]);

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
      this.globalConfigs.ignores,
    ];
  }

  public scope(scope: Scope) {
    const {
      files: { [scope]: files },
      ignores: { [scope]: ignores },
      rules: { [scope]: rules },
    } = this.scopes;

    if (files.length === 0 || rules.length === 0)
      return [];
    else {
      const {
        languageOptions,
        parserOptions,
        processor,
        language,
      } = this.settings.registry[scope];

      if ("parser" in languageOptions)
        if (languageOptions.parser in this.parsers)
          languageOptions.parser = this.parsers[languageOptions.parser as RequiredParser] as unknown as RequiredParser;
        else
          return [];

      if ("parser" in parserOptions)
        if (parserOptions.parser in this.parsers)
          parserOptions.parser = this.parsers[parserOptions.parser as RequiredParser] as unknown as RequiredParser;
        else
          return [];

      const manifest = {
        name: "linted/".concat(scope),
        files,
        ignores,
      };

      if (Object.keys(parserOptions).length !== 0)
        Object.assign(
          languageOptions,
          { parserOptions },
        );

      if (Object.keys(languageOptions).length !== 0)
        Object.assign(
          manifest,
          { languageOptions },
        );

      if (processor !== undefined)
        Object.assign(
          manifest,
          { processor },
        );

      if (language !== undefined)
        Object.assign(
          manifest,
          { language },
        );

      return [manifest].concat(
        rules.map(
          (
            {
              id,
              rules,
            },
          ) => ({
            name: "linted/".concat(scope, "/", id),
            files,
            ignores,
            rules,
          }),
        ),
      );
    }
  }
}
