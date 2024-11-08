import type { Scope } from "..";

export type Parsers = Scope
  & (
    | "ts"
    | "svelte"
    | "html"
    | "yml"
);
