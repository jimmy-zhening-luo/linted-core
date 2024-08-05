import type { Scope } from "../../scopes/index.js";

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
