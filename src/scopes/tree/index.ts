import type { Scope } from "..";

export const tree: [Scope, Scope[]][] = [
  ["jsonc", ["json"]] as const,
  ["mocha", ["ts"]] as const,
  ["svelte", ["ts"]] as const,
  ["ts", ["js"]] as const,
];
