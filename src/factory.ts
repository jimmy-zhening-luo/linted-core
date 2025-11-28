import type Core from ".";

export default function factory<
  Scope extends string,
  Optional extends Scope,
  RequiredPlugin extends string,
  RequiredParser extends Scope,
  Parser extends RequiredParser | Optional,
>(
  scopes: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, Parser>>[0],
  optional: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, Parser>>[1],
  tree: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, Parser>>[2],
  imports: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, Parser>>[3],
  settings: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, Parser>>[4],
  defaults: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, Parser>>[5],
  extensions?: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, Parser>>[6],
) {
  const Scopes = new Set(scopes);

  if (extensions) {
    const global = extensions["*"];

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

    for (const scope of optional)
      if (extensions[scope]) {
        imports.plugins[scope] = extensions[scope].plugin as typeof imports.plugins[Optional];
        imports.parsers[scope] = extensions[scope].parser as typeof imports.parsers[Optional];

      }
      else
        Scopes.delete(scope);

    for (const scope of Scopes)
      if (extensions[scope]) {
        const extension = extensions[scope]!;

        if (extension.files)
          void defaults.files[scope].push(
            ...extension.files,
          );

        if (extension.ignores)
          if (defaults.ignores[scope])
            void defaults.ignores[scope].push(
              ...extension.ignores,
            );
          else
            defaults.ignores[scope] = ignores;

        if (extension.rules)
          defaults.rules[scope][
            defaults.rules[scope].length
          ] = { rules: extension.rules };
      }
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
    .filter(scope => defaults.files[scope].length)
  setScopes = enabledScopes
    .filter(scope => settings[scope]);

  for (const scope of enabledScopes) {
    const files = defaults.files[scope],
    ignores = defaults.ignores[scope] ?? [];

    for (const rule of defaults.rules[scope]) {
      rule.files = files;
      rule.ignores = ignores;
    }

    if (settings[scope]) {
      const { [scope]: setting } = settings;

      setting.files = files;
      setting.ignores = ignores;

      if (setting.languageOptions) {
        const {
          parser,
          parserOptions: { parser: subparser } = {},
        } = setting.languageOptions;

        if (parser)
          setting
            .languageOptions
            .parser = imports.parsers[parser] as Parser;

        if (subparser)
          setting
            .languageOptions
            .parserOptions!
            .parser = imports.parsers[subparser] as Parser;
      }
    }
  }

  const configs = enabledScopes.flatMap(
    scope => defaults.rules[scope],
  ),
  rulesGlobalTotal = configs.length + 2;

  configs.length = rulesGlobalTotal + setScopes.length;
  configs[rulesGlobalTotal - 2] = {
    plugins: imports.plugins,
  };
  configs[rulesGlobalTotal - 1] = {
    ignores: defaults.ignores["*"] ?? [],
  };
  setScopes.forEach(
    (scope, i) => {
      configs[rulesGlobalTotal + i] = settings[scope];
    },
  );

  return configs;
}
