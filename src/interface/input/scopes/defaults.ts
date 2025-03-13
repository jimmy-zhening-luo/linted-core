import type { Config } from "../../proto";

export interface Defaults<Scopes extends string> {
  readonly settings: Config.Config["linterOptions"] & Config.Config["languageOptions"];
  readonly files: Readonly<Record<Scopes, string[]>>;
  readonly ignores: Readonly<Record<"*" | Scopes, string[]>>;
  readonly rules: Readonly<Record<Scopes, Config.Rule.NamedRuleBag[]>>;
}
