import type { Scope } from "../input.js";

type ParsedScopes = Scope & (
  | "ts"
  | "svelte"
  | "html"
  | "json"
  | "jsonc"
  | "yml"
);

export type Parsers = Record<ParsedScopes, unknown>;
