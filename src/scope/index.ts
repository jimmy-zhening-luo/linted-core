export const scopes = [
  "js",
  "ts",
  "mocha",
  "svelte",
  "html",
  "css",
  "json",
  "jsonc",
  "jsoncc",
  "yml",
] as const;
export const optional = ["svelte"] as const;
export { tree } from "./tree";
export type {
  Plugin,
  Parser,
} from "./dependencies";
