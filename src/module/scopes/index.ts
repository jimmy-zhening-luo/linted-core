const scopes = [
  "js",
  "ts",
  "svelte",
  "html",
  "json",
  "jsonc",
  "yml",
] as const;

export default scopes;
export type Scope = typeof scopes[number];