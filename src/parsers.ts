import type { Scopes } from "./scopes.js";

export default interface Parsers extends Particord<Scopes, unknown> {
  ts: unknown;
  svelte: unknown;
  html: unknown;
  json: unknown;
  jsonc: unknown;
  yml: unknown;
}
