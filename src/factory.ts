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
  const Scopes = new Set(scopes);

  if (extensions["*"]) {
    const globalExtension = extensions["*"];

    if (globalExtension.override || !defaults.ignores["*"])
      defaults.ignores["*"] = (globalExtension.ignores ?? []) as string[];
    else
      if (globalExtension.ignores?.length) {
        const { "*": ignores } = defaults.ignores,
        { length } = ignores,
        { length: x } = globalExtension.ignores;

        ignores.length = length + x;

        for (let i = 0; i < x; ++i)
          ignores[length + i] = globalExtension.ignores[i]!;
      }
  }

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

      if (extension.files?.length) {
        const { [scope]: files } = defaults.files,
        { length } = files,
        { length: x } = extension.files;

        files.length = length + x;

        for (let i = 0; i < x; ++i)
          files[length + i] = extension.files[i]!;
      }

      if (extension.ignores?.length)
        if (defaults.ignores[scope]?.length) {
          const ignores = defaults.ignores[scope],
          { length } = ignores,
          { length: x } = extension.ignores;

          ignores.length = length + x;

          for (let i = 0; i < x; ++i)
            ignores[length + i] = extension.ignores[i]!;
        }
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

      for (const parent of parents) {
        const { [parent]: parentFiles } = defaults.files,
        { length } = parentFiles,
        { length: x } = files;

        parentFiles.length = length + x;

        for (let i = 0; i < x; ++i)
          parentFiles[length + i] = files[i]!;
      }
    }

  const enabledScopes = [...Scopes]
    .filter(scope => defaults.files[scope].length),
  setScopes = enabledScopes
    .filter(scope => scope in settings);

  for (const scope of enabledScopes) {
    const {
      files: { [scope]: files },
      ignores: { [scope]: ignores },
    } = defaults;

    type Enscope<Config> = Config & {
      files?: typeof files;
      ignores?: typeof ignores;
    };

    for (const rule of defaults.rules[scope]) {
      (rule as Enscope<typeof rule>).files = files;

      if (ignores)
        (rule as Enscope<typeof rule>).ignores = ignores;
    }

    const setting = settings[scope];

    if (setting) {
      (setting as Enscope<typeof setting>).files = files;

      if (ignores)
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
  >[] = ["*", ...enabledScopes].flatMap(
    scope => defaults.rules[scope],
  );

  if (extensions["*"]?.rules)
    configs[configs.length] = extensions["*"].rules!;

  if (Object.keys(extensionPlugins).length)
    configs[configs.length] = { plugins: extensionPlugins };

  if (defaults.ignores["*"]?.length)
    configs[configs.length] = {
      ignores: defaults.ignores["*"],
    };

  const { length: scopeRuleConfigCount } = configs,
  { length: scopeSettingConfigCount } = setScopes;

  configs.length = scopeRuleConfigCount + scopeSettingConfigCount;

  for (let i = 0; i < scopeSettingConfigCount; ++i)
    configs[scopeRuleConfigCount + i] = settings[setScopes[i]]!;

  return configs;
}
