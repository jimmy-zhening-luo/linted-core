import type { Scope } from "..";

type ParsedScopes = Scope & (
  | "ts"
  | "svelte"
  | "html"
  | "json"
  | "jsonc"
  | "yml"
);

export type Parsers = Record<ParsedScopes, unknown>;
