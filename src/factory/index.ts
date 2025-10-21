import {
  defineConfig,
  globalIgnores,
  type Plugin,
  type RuleConfig,
} from "@eslint/config-helpers";
import type Core from "..";

type MutableRules<RuleArray> = RuleArray extends Array<
  infer Rules extends {
    name: string;
    rules: Record<
      string,
      Readonly<RuleConfig>
    >;
  }
>
  ? {
      name: Rules["name"];
      rules: {
        [Rule in keyof Rules["rules"]]: Mutable<Rules["rules"][Rule
        ]>
      };
    }[]
  : RuleArray;
type Mutable<V> = V extends object
  ? { -readonly [I in keyof V]: V[I] }
  : V;

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
      plugins[scope] = extensions[scope].plugin;
      parsers[scope] = extensions[scope].parsers;
    }

  for (const scope of scopes)
    if (extensions[scope] !== undefined) {
      const {
        [scope]: {
          files,
          ignores,
          rules,
        } = {},
      } = extensions;

      if (files !== undefined)
        defaults.files[scope]
          .push(...files);

      if (ignores !== undefined)
        if (defaults.ignores[scope] === undefined)
          /* eslint-disable no-param-reassign */
          defaults.ignores[scope] = ignores;
        else
          defaults.ignores[scope]
            .push(...ignores);

      if (rules !== undefined)
        if (defaults.rules[scope] === undefined)
          /* eslint-disable no-param-reassign */
          defaults.rules[scope] = [{ rules }];
        else
          /* eslint-disable no-param-reassign */
          defaults.rules[scope][
            defaults.rules[scope].length
          ] = { rules };
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
        for (const parent of parents) {
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
    globalIgnores(defaults.ignores["*"]),
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
                  [plugin]: plugins[plugin] as Plugin,
                },
              }),
            ),
          ],
        }),
      ),
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
          Object.assign(
            definition,
            { processor },
          );

        if (language !== undefined)
          Object.assign(
            definition,
            { language },
          );

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
