import type { Config, Rule } from "../../shared";

export interface Defaults<Scopes extends string> {
  readonly settings: Config["linterOptions"] & Config["languageOptions"];
  readonly files: Readonly<Record<"*" | Scopes, readonly string[]>>;
  readonly ignores: Defaults<Scopes>["files"];
  readonly rules: Readonly<Record<Scopes, readonly Rule.NamedBag[]>>;
}
