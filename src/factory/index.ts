import {
  defineConfig,
  globalIgnores,
} from "@eslint/config-helpers";
import type Core from "..";
import type { MutableRuleConfigs } from "../interface/rules";

export default function factory<
  Scope extends string,
  Optional extends Scope,
  RequiredPlugin extends string,
  RequiredParser extends Scope,
  Plugin extends RequiredPlugin | Optional,
  Parser extends RequiredParser | Optional,
>(
  scopes: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, Plugin, Parser>>[0],
  optional: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, Plugin, Parser>>[1],
  tree: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, Plugin, Parser>>[2],
  {
    plugins,
    parsers,
  }: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, Plugin, Parser>>[3],
  settings: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, Plugin, Parser>>[4],
  {
    defaults,
    extensions = {},
  }: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, Plugin, Parser>>[5],
) {
  for (const scope of optional)
    if (extensions[scope] !== undefined) {
      /* eslint-disable no-param-reassign */
      plugins[scope] = extensions[scope].plugin as typeof plugins[Optional];
      parsers[scope] = extensions[scope].parser as typeof parsers[Optional];
    }

  const extended = scopes.filter(
    scope => extensions[scope] !== undefined,
  ),
  optionalized = new Set<Scope>(
    optional.filter(
      scope => !(scope in parsers),
    ),
  );

  for (const scope of extended) {
    const {
      [scope]: {
        files,
        ignores,
        rules,
      } = {},
    } = extensions;

    if (files !== undefined)
      defaults
        .files[scope]
        .push(...files);

    if (ignores !== undefined)
      if (defaults.ignores[scope] === undefined)
      /* eslint-disable no-param-reassign */
        defaults.ignores[scope] = ignores;
      else
        defaults
          .ignores[scope]
          .push(...ignores);

    if (rules !== undefined)
      /* eslint-disable no-param-reassign */
      defaults.rules[scope][
        defaults.rules[scope].length
      ] = { rules };
  }

  for (const [scope, parents] of tree)
    if (!optionalized.has(scope))
      if (defaults.files[scope].length !== 0)
        for (const parent of parents)
          defaults
            .files[parent]
            .push(...defaults.files[scope]);

  if (extensions["*"] !== undefined)
    if (
      extensions["*"].override === true
      || defaults.ignores["*"] === undefined
    )
      defaults.ignores["*"] = extensions["*"].ignores ?? [];
    else
      if (extensions["*"].ignores !== undefined)
        if (extensions["*"].ignores.length !== 0)
          defaults
            .ignores["*"]
            .push(...extensions["*"].ignores);

  const active = scopes.filter(
    scope => !optionalized.has(scope)
      && defaults.files[scope].length !== 0
      && defaults.rules[scope].length !== 0,
  );

  return defineConfig(
    {
      plugins,
    },
    defaults.ignores["*"] === undefined
      ? []
      : globalIgnores(defaults.ignores["*"]),
    active
      .filter(
        scope => settings[scope] !== undefined,
      )
      .map(
        scope => {
          const {
            languageOptions,
            parserOptions,
            processor,
            language,
          } = settings[scope]!;

          if (languageOptions?.parser !== undefined)
            languageOptions.parser = parsers[languageOptions.parser] as Parser;

          if (parserOptions?.parser !== undefined)
            parserOptions.parser = parsers[parserOptions.parser] as Parser;

          const definition = languageOptions === undefined
            ? parserOptions === undefined
              ? {}
              : {
                  languageOptions: {
                    parserOptions,
                  },
                }
            : {
                languageOptions: parserOptions === undefined
                  ? languageOptions
                  : Object.assign(
                      languageOptions,
                      { parserOptions },
                    ),
              };

          if (processor !== undefined)
            (definition as typeof definition & { processor: string }).processor = processor;

          if (language !== undefined)
            (definition as typeof definition & { language: string }).language = language;

          return {
            files: defaults.files[scope],
            ignores: defaults.ignores[scope] ?? [],
            "extends": [definition],
          };
        },
      ),
    active.map(
      scope => ({
        files: defaults.files[scope],
        ignores: defaults.ignores[scope] ?? [],
        "extends": [defaults.rules[scope] as MutableRuleConfigs<NonNullable<typeof defaults.rules[typeof scope]>>],
      }),
    ),
  );
}
