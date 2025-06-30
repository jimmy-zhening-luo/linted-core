import type { scopes } from "..";

export const tree: [
    typeof scopes[number],
    typeof scopes[number][],
][] = [
  ["jsoncc", ["jsonc"]] as const,
  ["jsonc", ["json"]] as const,
  ["mocha", ["ts"]] as const,
  ["svelte", ["ts"]] as const,
  ["ts", ["js"]] as const,
];
