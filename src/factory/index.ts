import type { Configuration } from "../interface";

export default function factory<
  Scope extends string,
  Optional extends Scope,
  Plugin extends string,
  Parser extends Scope,
>(
  scopes: readonly Scope[],
  optional: readonly Optional[],
  tree: Array<
    readonly [
      Scope,
      readonly Scope[],
    ]
  >,
  {
    plugins,
    parsers,
  }: {
    plugins: Record<Plugin, unknown>;
    parsers: Record<Parser, unknown>;
  },
  {
    defaults,
    extensions = {},
  }: Configuration<
    Scope,
    Optional,
    Parser
  >,
) {
  for (const scope of optional)
    if (extensions[scope] !== undefined) {
      Object.assign(
        plugins,
        {
          [scope]: extensions[scope].plugin,
        },
      );
      Object.assign(
        parsers,
        {
          [scope]: extensions[scope].parser,
        },
      );
    }

  for (const scope of scopes)
    if (extensions[scope] !== undefined) {
      const {
        [scope]: {
          files = [],
          ignores = [],
          rules = null,
        } = {},
      } = extensions;

      if (files.length !== 0)
        if (defaults.files[scope] === undefined)
          Object.assign(
            defaults.files,
            { [scope]: files },
          );
        else {
          const defaultFiles = defaults.files[scope],
          L = defaultFiles.length;

          defaultFiles.length += files.length;

          for (let i = 0; i < files.length; i++)
            defaultFiles[L + i] = files[i]!;
        }

      if (ignores.length !== 0)
        if (defaults.ignores[scope] === undefined)
          Object.assign(
            defaults.ignores,
            { [scope]: ignores },
          );
        else {
          const defaultIgnores = defaults.ignores[scope],
          L = defaultIgnores.length;

          defaultIgnores.length += ignores.length;

          for (let i = 0; i < ignores.length; i++)
            defaultIgnores[L + i] = ignores[i]!;
        }

      if (rules !== null)
        if (defaults.rules[scope] === undefined)
          Object.assign(
            defaults.rules,
            {
              [scope]: [
                {
                  id: scope.concat("/override"),
                  rules,
                },
              ],
            },
          );
        else
        /* eslint-disable no-param-reassign */
          defaults.rules[scope][
            defaults.rules[scope].length
          ] = {
            id: scope.concat("/override"),
            rules,
          };
    }

  const Optional = new Set<Scope>(optional);

  for (const [scope, parents] of tree)
    if (
      !Optional.has(scope)
      || scope in parsers
    ) {
      const files = defaults.files[scope],
      ignores = defaults.ignores[scope];

      if (files !== undefined)
        if (files.length !== 0)
          for (const parent of parents)
            if (defaults.files[parent] === undefined)
              Object.assign(
                defaults.files,
                { [parent]: files },
              );
            else {
              const parentFiles = defaults.files[parent],
              L = parentFiles.length;

              parentFiles.length += files.length;

              for (let i = 0; i < files.length; i++)
                parentFiles[L + i] = files[i]!;
            }

      if (ignores !== undefined)
        if (ignores.length !== 0)
          for (const parent of parents)
            if (defaults.ignores[parent] === undefined)
              Object.assign(
                defaults.ignores,
                { [parent]: ignores },
              );
            else {
              const parentIgnores = defaults.ignores[parent],
              L = parentIgnores.length;

              parentIgnores.length += ignores.length;

              for (let i = 0; i < ignores.length; i++)
                parentIgnores[L + i] = ignores[i]!;
            }
    }

  if (extensions["*"] !== undefined)
    if (extensions["*"].override === true)
      Object.assign(
        defaults.ignores,
        { "*": extensions["*"].ignores ?? [] },
      );
    else
      if (extensions["*"].ignores !== undefined)
        if (extensions["*"].ignores.length !== 0) {
          const { ignores } = extensions["*"],
          defaultGlobals = defaults.ignores["*"],
          L = defaultGlobals.length;

          defaultGlobals.length += ignores.length;

          for (let i = 0; i < ignores.length; i++)
            defaultGlobals[L + i] = ignores[i]!;
        }

  const configs: unknown[] = [
    {
      name: "linted/*/plugins",
      plugins,
    },
    {
      name: "linted/*/ignores",
      ignores: defaults.ignores["*"],
    },
  ],
  scopeConfigs: unknown[] = scopes.flatMap(
    scope => {
      const {
        files: { [scope]: files },
        ignores: { [scope]: ignores = [] },
        rules: { [scope]: rules },
        settings: { [scope]: settings },
      } = defaults;

      if (
        files === undefined
        || rules === undefined
        || files.length === 0
        || rules.length === 0
        || Optional.has(scope)
        && !(scope in parsers)

      )
        return [];
      else {
        const manifest = {
          name: "linted/".concat(scope),
          files,
          ignores,
        };

        if (settings !== undefined) {
          const {
            languageOptions,
            parserOptions,
            processor,
            language,
          } = settings;

          if (languageOptions?.parser !== undefined)
            languageOptions.parser = parsers[languageOptions.parser as Parser] as unknown as Parser;

          if (parserOptions?.parser !== undefined)
            parserOptions.parser = parsers[parserOptions.parser as Parser] as unknown as Parser;

          if (languageOptions === undefined) {
            if (
              parserOptions !== undefined
              && Object.keys(parserOptions).length !== 0
            )
              Object.assign(
                manifest,
                {
                  languageOptions: {
                    parserOptions,
                  },
                },
              );
          }
          else {
            if (
              parserOptions !== undefined
              && Object.keys(parserOptions).length !== 0
            )
              Object.assign(
                languageOptions,
                { parserOptions },
              );

            if (Object.keys(languageOptions).length !== 0)
              Object.assign(
                manifest,
                { languageOptions },
              );
          }

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
        }

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
    },
  );

  if (scopeConfigs.length !== 0) {
    const L = configs.length;

    configs.length += scopeConfigs.length;

    for (let i = 0; i < scopeConfigs.length; i++)
      configs[L + i] = scopeConfigs[i];
  }

  return configs;
}
