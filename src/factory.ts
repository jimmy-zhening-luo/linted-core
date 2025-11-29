import type Core from ".";

export default function factory<
  Scope extends string,
  Optional extends Scope,
>(
  scopes: Parameters<typeof Core<Scope, Optional>>[0],
  optional: Parameters<typeof Core<Scope, Optional>>[1],
  tree: Parameters<typeof Core<Scope, Optional>>[2],
  parsers: Parameters<typeof Core<Scope, Optional>>[3],
  settings: Parameters<typeof Core<Scope, Optional>>[4],
  defaults: Parameters<typeof Core<Scope, Optional>>[5],
  extensions: Parameters<typeof Core<Scope, Optional>>[6],
) {
  const Scopes = new Set(scopes),
  global = extensions["*"];

  if (global)
    if (
      global.override
      || !defaults.ignores["*"]
    )
      defaults.ignores["*"] = global.ignores ?? [];
    else
      if (global.ignores?.length)
        void defaults.ignores["*"].push(
          ...global.ignores,
        );

  const extensionPlugins: Record<string, unknown> = {};

  for (const scope of optional)
    if (extensions[scope]) {
      extensionPlugins[scope] = extensions[scope].plugin;
      parsers[scope] = extensions[scope].parser;
    }

    else
      Scopes.delete(scope);

  for (const scope of Scopes)
    if (extensions[scope]) {
      const extension = extensions[scope];

      if (extension.files)
        void defaults.files[scope].push(
          ...extension.files as string[],
        );

      if (extension.ignores)
        if (defaults.ignores[scope])
          void defaults.ignores[scope].push(
            ...extension.ignores,
          );
        else
          defaults.ignores[scope] = extension.ignores as string[];

      if (extension.rules)
        defaults.rules[scope][
          defaults.rules[scope].length
        ] = { rules: extension.rules };
    }

  for (const [scope, parents] of tree)
    if (
      Scopes.has(scope)
      && defaults.files[scope].length
    ) {
      const { [scope]: files } = defaults.files;

      for (const parent of parents)
        void defaults.files[parent].push(...files);
    }

  const enabledScopes = [...Scopes]
    .filter(scope => defaults.files[scope].length),
  setScopes = enabledScopes
    .filter(scope => scope in settings);

  for (const scope of enabledScopes) {
    const files = defaults.files[scope],
    ignores = defaults.ignores[scope] ?? [];

    type Enscope<Config> = Config & {
      files?: typeof files;
      ignores?: typeof ignores;
    };

    for (const rule of defaults.rules[scope]) {
      (rule as Enscope<typeof rule>).files = files;
      (rule as Enscope<typeof rule>).ignores = ignores;
    }

    const setting = settings[scope];

    if (setting) {
      (setting as Enscope<typeof setting>).files = files;
      (setting as Enscope<typeof setting>).ignores = ignores;

      if (setting.languageOptions) {
        const {
          parser,
          parserOptions: { parser: subparser } = {},
        } = setting.languageOptions;

        if (parser)
          setting
            .languageOptions
            .parser = parsers[parser] as Scope;

        if (subparser)
          setting
            .languageOptions
            .parserOptions!
            .parser = parsers[subparser] as Scope;
      }
    }
  }

  const configs: Partial<
    Record<
      | "plugins"
      | "rules"
      | "files"
      | "ignores"
      | "languageOptions"
      | "language"
      | "processor",
      unknown
    >
  >[] = enabledScopes.flatMap(
    scope => defaults.rules[scope],
  ),
  rulesGlobalTotal = configs.length + 1;

  configs.length = rulesGlobalTotal + setScopes.length;
  configs[rulesGlobalTotal - 1] = {
    ignores: defaults.ignores["*"] ?? [],
  };
  setScopes.forEach(
    (scope, i) => {
      configs[rulesGlobalTotal + i] = settings[scope]!;
    },
  );

  if (Object.keys(extensionPlugins).length)
    configs[configs.length] = { plugins: extensionPlugins };

  return configs;
}
