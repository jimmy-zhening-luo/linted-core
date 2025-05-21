import type { Scope } from "..";

export const tree: [Scope, readonly Scope[]][] = [
  ["jsonc", ["json"] as const] as const,
  ["mocha", ["ts"] as const] as const,
  ["svelte", ["ts"] as const] as const,
  ["ts", ["js"] as const] as const,
] as const;
