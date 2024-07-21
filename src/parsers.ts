import type { Scope } from "./scopes.js";

export default interface Parsers extends Particord<Scope, unknown> {
  ts: unknown;
  svelte: unknown;
  html: unknown;
  json: unknown;
  jsonc: unknown;
  yml: unknown;
}
