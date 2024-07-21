import type { Scope } from "./scopes.js";

type ParsedScopes =
  | "ts"
  | "svelte"
  | "html"
  | "json"
  | "jsonc"
  | "yml";

export type Parsers = Particord<Scope, unknown> & Record<ParsedScopes, unknown>;
