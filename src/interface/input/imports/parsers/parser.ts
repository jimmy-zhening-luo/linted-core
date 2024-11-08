import type { Scope } from ".";

export type Parser = Scope
  & (
    | "ts"
    | "svelte"
    | "html"
    | "jsonc"
    | "yml"
);
