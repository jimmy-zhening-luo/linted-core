import type { Proto } from "../../proto";

export interface Defaults<Scopes extends string> {
  readonly settings: Proto.Config["linterOptions"] & Proto.Config["languageOptions"];
  readonly files: Readonly<Record<Scopes, string[]>>;
  readonly ignores: Readonly<Record<"*" | Scopes, string[]>>;
  readonly rules: Readonly<Record<Scopes, Proto.Rule.NamedRuleBag[]>>;
}
