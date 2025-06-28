import type { Scope } from "..";

export const tree: [Scope, Scope[]][] = [
  ["jsoncc", ["jsonc"]] as const,
  ["jsonc", ["json"]] as const,
  ["mocha", ["ts"]] as const,
  ["svelte", ["ts"]] as const,
  ["ts", ["js"]] as const,
];
