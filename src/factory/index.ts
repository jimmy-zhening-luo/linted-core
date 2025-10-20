import {
  defineConfig,
  globalIgnores,
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

      if (files.length !== 0) {
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
            name: scope.concat("/override"),
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
  );

  return defineConfig(
    {
      name: "plugins",
      plugins,
    },
    globalIgnores(defaults.ignores["*"]),
    activeScopes
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
