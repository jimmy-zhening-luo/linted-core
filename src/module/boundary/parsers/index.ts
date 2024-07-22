import type { Scope } from "../index.js";

type ParsedScopes = Scope & (
  | "ts"
  | "svelte"
  | "html"
  | "json"
  | "jsonc"
  | "yml"
);

export type Parsers = Record<ParsedScopes, unknown>;
