export type {
  Plugin,
  Parser,
} from "./dependencies";
export { tree } from "./tree";
export { registry } from "./registry";
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
