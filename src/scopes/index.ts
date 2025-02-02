export type * from "./imports";
export * from "./tree";
export type Scopes = typeof scopes[number];
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
