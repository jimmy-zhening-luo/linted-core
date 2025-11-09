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

  if (extensions !== undefined) {
    for (const scope of optional)
      if (extensions[scope] === undefined)
        Scopes.delete(scope);
      else {
        imports.plugins[scope] = extensions[scope].plugin as typeof imports.plugins[Optional];
        imports.parsers[scope] = extensions[scope].parser as typeof imports.parsers[Optional];
      }

    for (const scope of Scopes)
      if (extensions[scope] !== undefined) {
        if (extensions[scope].files !== undefined)
          void defaults.files[scope].push(
            ...extensions[scope].files,
          );

        if (extensions[scope].ignores !== undefined)
          if (defaults.ignores[scope] === undefined)

            defaults.ignores[scope] = extensions[scope].ignores;
          else
            void defaults.ignores[scope].push(
              ...extensions[scope].ignores,
            );

        if (extensions[scope].rules !== undefined)
          defaults.rules[scope][
            defaults.rules[scope].length
          ] = { rules: extensions[scope].rules };
      }
  }

  for (const [scope, parents] of tree)
    if (
      Scopes.has(scope)
      && defaults.files[scope].length !== 0
    )
      for (const parent of parents)
        void defaults.files[parent].push(
          ...defaults.files[scope],
        );

  if (extensions !== undefined)
    if (extensions["*"] !== undefined)
      if (
        extensions["*"].override === true
        || defaults.ignores["*"] === undefined
      )
        defaults.ignores["*"] = extensions["*"].ignores ?? [];
      else
        if (
          extensions["*"].ignores !== undefined
          && extensions["*"].ignores.length !== 0
        )
          void defaults.ignores["*"].push(
            ...extensions["*"].ignores,
          );

  const enabledScopes = [...Scopes]
    .filter(scope => defaults.files[scope].length !== 0)
    .filter(scope => defaults.rules[scope].length !== 0);

  return defineConfig(
    { plugins: imports.plugins },
    globalIgnores(defaults.ignores["*"] ?? []),
    enabledScopes
      .map(
        scope => {
          const definition: {
            languageOptions?: {
              parserOptions?: {
                parser?: Parser;
              };
              parser?: Parser;
            };
            processor?: string;
            language?: string;
          } = {};

          if (settings[scope] !== undefined) {
            const {
              languageOptions,
              parserOptions,
              processor,
              language,
            } = settings[scope];

            if (languageOptions?.parser !== undefined)
              languageOptions.parser = imports.parsers[languageOptions.parser] as Parser;

            if (parserOptions?.parser !== undefined)
              parserOptions.parser = imports.parsers[parserOptions.parser] as Parser;

            if (parserOptions === undefined) {
              if (languageOptions !== undefined)
                definition.languageOptions = languageOptions;
            }
            else
              if (languageOptions === undefined)
                definition.languageOptions = {
                  parserOptions,
                };
              else {
                (languageOptions as NonNullable<typeof definition.languageOptions>).parserOptions = parserOptions;
                definition.languageOptions = languageOptions;
              }

            if (processor !== undefined)
              (definition as typeof definition & { processor: string }).processor = processor;

            if (language !== undefined)
              (definition as typeof definition & { language: string }).language = language;
          }

          return {
            files: defaults.files[scope],
            ignores: defaults.ignores[scope] ?? [],
            "extends": [
              definition.languageOptions !== undefined
              || definition.language !== undefined
              || definition.processor !== undefined
                ? definition
                : [],
              defaults.rules[scope] as MutableRuleConfigs<NonNullable<typeof defaults.rules[typeof scope]>>,
            ],
          };
        },
      ),
  );
}
