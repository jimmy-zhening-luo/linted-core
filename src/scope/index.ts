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
export const optionalScopes = ["svelte"] as const;
export { tree } from "./tree";
export { registry } from "./registry";
export type {
  RequiredPlugin,
  RequiredParser,
} from "./dependencies";
