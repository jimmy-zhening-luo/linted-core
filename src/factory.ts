import {
  defineConfig,
  globalIgnores,
} from "@eslint/config-helpers";
import type Core from ".";
import type { MutableRuleConfigs } from "../typings/rules";

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
    for (const scope of optional)
      if (extensions[scope]) {
        imports.plugins[scope] = extensions[scope].plugin as typeof imports.plugins[Optional];
        imports.parsers[scope] = extensions[scope].parser as typeof imports.parsers[Optional];
      }
      else
        Scopes.delete(scope);

    for (const scope of Scopes)
      if (extensions[scope]) {
        if (extensions[scope].files)
          void defaults.files[scope].push(
            ...extensions[scope].files,
          );

        if (extensions[scope].ignores)
          if (defaults.ignores[scope])
            void defaults.ignores[scope].push(
              ...extensions[scope].ignores,
            );
          else
            defaults.ignores[scope] = extensions[scope].ignores;

        if (extensions[scope].rules)
          defaults.rules[scope][
            defaults.rules[scope].length
          ] = { rules: extensions[scope].rules };
      }
  }

  for (const [scope, parents] of tree)
    if (
      Scopes.has(scope)
      && defaults.files[scope].length
    )
      for (const parent of parents)
        void defaults.files[parent].push(
          ...defaults.files[scope],
        );

  if (extensions)
    if (extensions["*"])
      if (
        extensions["*"].override
        || !defaults.ignores["*"]
      )
        defaults.ignores["*"] = extensions["*"].ignores ?? [];
      else
        if (extensions["*"].ignores?.length)
          void defaults.ignores["*"].push(
            ...extensions["*"].ignores,
          );

  const enabledScopes = [...Scopes]
    .filter(scope => defaults.files[scope].length)
    .filter(scope => defaults.rules[scope].length);

  for (const scope of enabledScopes)
    if (settings[scope])
      if (settings[scope].languageOptions) {
        const {
          parser,
          parserOptions: { parser: subparser } = {},
        } = settings[scope].languageOptions;

        if (parser)
          settings[scope]
            .languageOptions
            .parser = imports.parsers[parser] as Parser;

        if (subparser)
          settings[scope]
            .languageOptions
            .parserOptions
            .parser = imports.parsers[subparser] as Parser;
      }

  const enum Count {
    Global = 2,
  }

  const configs = [
    {
      name: "*/plugins",
      plugins: imports.plugins,
    },
    {
      name: "*/ignores",
      ignores: defaults.ignores["*"] ?? [],
    },
  ],
  scopeCount = enabledScopes.length;

  configs.length = Count.Global + scopeCount;

  for (let i = 0; i < scopeCount; ++i) {
    const scope = enabledScopes[i];

    config[i + Count.Global] = {
      files: defaults.files[scope],
      ignores: defaults.ignores[scope] ?? [],
      "extends": [
        settings[scope] ?? [],
        defaults.rules[scope] as MutableRuleConfigs<NonNullable<typeof defaults.rules[typeof scope]>>,
      ],
    };
  }

  return configs;
}
