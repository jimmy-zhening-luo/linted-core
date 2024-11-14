import type { Config } from "..";
import type { Scopes } from "../..";

export type Scoped = {
  readonly name: `linted/${Scopes}:${string}`;
  readonly languageOptions: Omit<Config["languageOptions"], "sourceType" | "ecmaVersion">;
} & Pick<Config, "files" | "ignores" | "rules" | "processor" | "language" | "settings">;
