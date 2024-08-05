const scopes = [
  "js",
  "ts",
  "svelte",
  "mocha",
  "html",
  "json",
  "jsonc",
  "yml",
  "md",
] as const;

export default scopes;
export type Scope = (typeof scopes)[number];
