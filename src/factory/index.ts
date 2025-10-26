import {
  defineConfig,
  globalIgnores,
} from "@eslint/config-helpers";
import type Core from "..";
import type { MutableRules } from "../interface/rules";

export default function factory<
  Scope extends string,
  Optional extends Scope,
  RequiredPlugin extends string,
  RequiredParser extends Scope,
  TPlugin extends RequiredPlugin | Optional,
  Parser extends RequiredParser | Optional,
>(
  scopes: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, TPlugin, Parser>>[0],
  optional: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, TPlugin, Parser>>[1],
  tree: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, TPlugin, Parser>>[2],
  {
    plugins,
    parsers,
  }: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, TPlugin, Parser>>[3],
  settings: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, TPlugin, Parser>>[4],
  {
    defaults,
    extensions = {},
  }: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, TPlugin, Parser>>[5],
) {
  for (const scope of optional)
    if (extensions[scope] !== undefined) {
      /* eslint-disable no-param-reassign */
      plugins[scope] = extensions[scope].plugin as typeof plugins[Optional];
      parsers[scope] = extensions[scope].parser as typeof parsers[Optional];
    }

  const extended = scopes.filter(
    scope => extensions[scope] !== undefined,
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
      if (defaults.rules[scope] === undefined)
      /* eslint-disable no-param-reassign */
        defaults.rules[scope] = [
          {
            rules,
            name: scope.concat("/user"),
          },
        ];
      else
      /* eslint-disable no-param-reassign */
        defaults.rules[scope][
          defaults.rules[scope].length
        ] = {
          rules,
          name: scope.concat("/user"),
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

      if (files.length !== 0)
        for (const parent of parents)
          defaults
            .files[parent]
            .push(...files);

      if (ignores !== undefined)
        if (ignores.length !== 0)
          for (const parent of parents)
            if (defaults.ignores[parent] === undefined)
              defaults.ignores[parent] = ignores;
            else
              defaults
                .ignores[parent]
                .push(...ignores);
    }

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

  const activeScopes = scopes.filter(
    scope => defaults.rules[scope] !== undefined
      && defaults.files[scope].length !== 0
      && defaults.rules[scope].length !== 0
      && (
        !Optional.has(scope)
        || scope in parsers
      ),
  ),
  activeScopeSettings = activeScopes.filter(
    scope => settings[scope] !== undefined,
  );

  return defineConfig(
    activeScopeSettings
      .filter(
        scope => settings[scope]!.plugins !== undefined,
      )
      .map(
        scope => ({
          files: defaults.files[scope],
          ignores: defaults.ignores[scope] ?? [],
          "extends": [
            settings[scope]!.plugins!.map(
              plugin => ({
                plugins: {
                  [plugin]: plugins[plugin] as object,
                },
              }),
            ),
          ],
        }),
      ),
    defaults.ignores["*"] === undefined ? [] : globalIgnores(defaults.ignores["*"]),
    activeScopeSettings.map(
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
          name: "scope/".concat(
            scope,
            "/definition",
          ),
          files: defaults.files[scope],
          ignores: defaults.ignores[scope] ?? [],
          "extends": [definition],
        };
      },
    ),
    activeScopes.map(
      scope => ({
        name: "scope/".concat(scope),
        files: defaults.files[scope],
        ignores: defaults.ignores[scope] ?? [],
        "extends": [defaults.rules[scope] as MutableRules<NonNullable<typeof defaults.rules[typeof scope]>>],
      }),
    ),
  );
}
