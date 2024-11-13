export type Scopes = typeof scopes[number];
export const scopes = [
  "js",
  "ts",
  "svelte",
  "mocha",
  "html",
  "json",
  "jsonc",
  "yml",
] as const;