import type { Config } from "../../proto";

export interface Defaults<Scopes extends string> {
  settings: Config.Config["linterOptions"] & Config.Config["languageOptions"];
  files: Record<Scopes, string[]>;
  ignores: Record<"*" | Scopes, string[]>;
  rules: Record<Scopes, Config.Rule.NamedRuleBag[]>;
}
