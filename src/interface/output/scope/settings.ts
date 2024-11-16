import type { Config } from "../../shared";

export type ScopeSettings<Scopes extends string> = {
  readonly name: `linted/${Scopes}/settings`;
  readonly languageOptions: object;
} & Pick<Config, "files" | "ignores" | "processor" | "language" | "settings">;
