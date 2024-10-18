import type { Scope } from "@eslinted/core/scopes";

export type Parsers = Scope
  & (
    | "ts"
    | "svelte"
    | "html"
    | "jsonc"
    | "yml"
    | "md"
);
