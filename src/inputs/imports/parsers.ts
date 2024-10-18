import type { Scope } from "@eslinted/core";

export type Parsers = Scope
  & (
    | "ts"
    | "svelte"
    | "html"
    | "jsonc"
    | "yml"
    | "md"
);
