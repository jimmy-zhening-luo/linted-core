import type { Config } from "..";

export type Scoped<Scopes extends string> = {
  readonly name: `linted/${Scopes}:${string}`;
  readonly languageOptions: Omit<Config["languageOptions"], "sourceType" | "ecmaVersion">;
} & Pick<Config, "files" | "ignores" | "rules" | "processor" | "language" | "settings">;
