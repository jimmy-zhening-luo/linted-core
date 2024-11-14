import type {
  Scopes,
  Config,
} from "..";
import type { ImportPlugins } from "./imports";

export type Exclusive<Base extends object, Cool extends object> = Cool & Partial<Readonly<Record<Exclude<keyof Base, keyof Cool>, never>>>;
export type Output = readonly [
  Exclusive<
    Config,
    {
      readonly name: `linted/*/settings`;
      readonly languageOptions: Pick<Config["languageOptions"], "ecmaVersion" | "sourceType">;
    } & Pick<Config<ImportPlugins>, "plugins" | "linterOptions">
  >,
  Exclusive<
    Config,
    { readonly name: `linted/*/ignores` } & Pick<Config, "ignores">
  >,
  ...({
    readonly name: `linted/${Scopes}:${string}`;
    readonly languageOptions: Omit<Config["languageOptions"], "sourceType" | "ecmaVersion">;
  } & Pick<Config, "files" | "ignores" | "rules" | "processor" | "language" | "settings">)[],
];
