import type { Scopes } from "..";

export type Parsers = Scopes & (
  | "ts"
  | "svelte"
  | "html"
  | "jsonc"
  | "yml"
);
