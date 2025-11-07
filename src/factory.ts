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
  {
    plugins,
    parsers,
  }: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, Parser>>[3],
  settings: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, Parser>>[4],
  {
    defaults,
    extensions = {},
  }: Parameters<typeof Core<Scope, Optional, RequiredPlugin, RequiredParser, Parser>>[5],
) {
  const Scopes = new Set(scopes),
  OptionalScopes = new Set(optional),
  RequiredScopes = Scopes.difference(OptionalScopes),
  ExtendedScopes = new Set(
    Object.keys(extensions) as Scope[],
  )
    .intersection(Scopes),
  ExtendedOptionalScopes = ExtendedScopes
    .intersection(OptionalScopes),
  ConfiguredScopes = RequiredScopes
    .union(ExtendedOptionalScopes);

  for (const scope of ExtendedOptionalScopes) {
    plugins[scope] = extensions[scope]!.plugin as typeof plugins[Optional];
    parsers[scope] = extensions[scope]!.parser as typeof parsers[Optional];
  }

  for (const scope of ExtendedScopes) {
    const {
      [scope]: {
        files,
        ignores,
        rules,
      } = {},
    } = extensions;

    if (files !== undefined)
      void defaults.files[scope].push(
        ...files,
      );

    if (ignores !== undefined)
      if (defaults.ignores[scope] === undefined)

        defaults.ignores[scope] = ignores;
      else
        void defaults.ignores[scope].push(
          ...ignores,
        );

    if (rules !== undefined)

      defaults.rules[scope][
        defaults.rules[scope].length
      ] = { rules };
  }

  for (const [scope, parents] of tree)
    if (
      ConfiguredScopes.has(scope)
      && defaults.files[scope].length !== 0
    )
      for (const parent of parents)
        void defaults.files[parent].push(
          ...defaults.files[scope],
        );

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

  const enabledScopes = scopes
    .filter(scope => ConfiguredScopes.has(scope))
    .filter(scope => defaults.files[scope].length !== 0)
    .filter(scope => defaults.rules[scope].length !== 0);

  return defineConfig(
    { plugins },
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
              languageOptions.parser = parsers[languageOptions.parser] as Parser;

            if (parserOptions?.parser !== undefined)
              parserOptions.parser = parsers[parserOptions.parser] as Parser;

            if (parserOptions === undefined) {
              if (languageOptions !== undefined)
                definition.languageOptions = languageOptions;
            }
            else
              // parser YES
              if (languageOptions === undefined)
                // language NO parser YES
                definition.languageOptions = {
                  parserOptions,
                };
              else
                // language YES parser YES
                definition.languageOptions = Object.assign(languageOptions, { parserOptions });

            if (processor !== undefined)
              (definition as typeof definition & { processor: string }).processor = processor;

            if (language !== undefined)
              (definition as typeof definition & { language: string }).language = language;
          }

          return {
            files: defaults.files[scope],
            ignores: defaults.ignores[scope] ?? [],
            "extends": [
              Object.keys(definition).length === 0 ? [] : definition,
              defaults.rules[scope] as MutableRuleConfigs<NonNullable<typeof defaults.rules[typeof scope]>>,
            ],
          };
        },
      ),
  );
}
