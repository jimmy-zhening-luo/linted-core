import type { Scope } from "../../scopes/Scopes.js";

type Parsers =
  | "ts"
  | "svelte"
  | "html"
  | "jsonc"
  | "yml"
  | "md"
  & Scope
;

export type { Parsers as default };
