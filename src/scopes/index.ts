export type * from "./imports";
export * from "./tree";
export const scopes = [
  "js",
  "ts",
  "mocha",
  "svelte",
  "html",
  "css",
  "json",
  "jsonc",
  "yml",
] as const;
export type Scope = typeof scopes[number];
