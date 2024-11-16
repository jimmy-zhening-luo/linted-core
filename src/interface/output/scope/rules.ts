import type { Config } from "../../shared";

export type ScopeRules<Scopes extends string> = {
  readonly name: `linted/${Scopes}/${string}`;
} & Pick<Config, "files" | "ignores" | "rules">;
