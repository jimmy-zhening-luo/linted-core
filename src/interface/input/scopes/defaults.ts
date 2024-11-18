import type { Config, Rule } from "../../shared";

export interface Defaults<Scopes extends string> {
  readonly settings: Config["linterOptions"] & Config["languageOptions"];
  readonly files: Readonly<Record<Scopes, string[]>>;
  readonly ignores: Readonly<Record<"*" | Scopes, string[]>>;
  readonly rules: Readonly<Record<Scopes, Rule.NamedBag[]>>;
}
