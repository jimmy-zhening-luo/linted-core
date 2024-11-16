import type {
  CommonPlugins,
  CommonSettings,
  CommonIgnores,
} from "./common";
import type {
  ScopeSettings,
  ScopeRules,
} from "./scope";
import type { Plugins, Scopes } from "../../scopes";

export type Output = readonly [
  CommonSettings,
  CommonPlugins<Plugins>,
  CommonIgnores,
  ...readonly (ScopeSettings<Scopes> | ScopeRules<Scopes>)[],
];
