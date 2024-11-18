import type {
  CommonSettings,
  CommonIgnores,
} from "./common";
import type {
  ScopeSettings,
  ScopeRules,
} from "./scope";
import type { Scopes } from "../../scopes";

export type Output = readonly [
  CommonSettings,
  CommonIgnores,
  ...readonly (ScopeSettings<Scopes> | ScopeRules<Scopes>)[],
];
