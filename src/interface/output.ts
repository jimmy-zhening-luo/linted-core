import type {
  Scopes,
  Config,
} from "..";
import type { ImportPlugins } from "./imports";

export type Exclusive<Base extends object, Cool extends object> = Cool & Partial<Record<Exclude<keyof Base, keyof Cool>, never>>;
export type Output = [
  Exclusive<
    Config,
    {
      name: `linted/*/settings`;
      languageOptions: Pick<Config["languageOptions"], "ecmaVersion" | "sourceType">;
    } & Pick<Config<ImportPlugins>, "plugins" | "linterOptions">
  >,
  Exclusive<
    Config,
    { name: `linted/*/ignores` } & Pick<Config, "ignores">
  >,
  ...({
    name: `linted/${Scopes}:${string}`;
    languageOptions: Omit<Config["languageOptions"], "sourceType" | "ecmaVersion">;
  } & Pick<Config, "files" | "ignores" | "rules" | "processor" | "language" | "settings">)[],
];
