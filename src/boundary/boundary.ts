import scopes, { type Scope } from "./scopes/scopes.js";
import type { Plugins, Parsers } from "./input/input.js";
import type IConfig from "./output/output.js";

export default scopes;
export type {
  Scope,
  Plugins,
  Parsers,
  IConfig,
};
