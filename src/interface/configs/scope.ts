import type { Scopes } from "../../scopes";
import type { Config } from "./config";

export type ScopeConfig = {
  readonly name: `linted/${Scopes}:${string}`;
  readonly languageOptions: Omit<Config["languageOptions"], "sourceType" | "ecmaVersion">;
} & Pick<Config, "files" | "ignores" | "rules" | "processor" | "language" | "settings">;
