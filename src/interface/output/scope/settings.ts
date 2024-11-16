import type { Config } from "../../shared";

export type ScopeSettings<Scopes extends string> = {
  readonly name: `linted/${Scopes}`;
  readonly languageOptions: object;
} & Pick<Config, "files" | "ignores" | "processor" | "language" | "settings">;
