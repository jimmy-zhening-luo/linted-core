import type {
  CommonPlugins,
  CommonSettings,
  CommonIgnores,
} from "./common";
import type {
  ScopedSettings,
  ScopedRules,
} from "./scoped";
import type { Plugins, Scopes } from "../../scopes";

export type Output = readonly [
  CommonPlugins<Plugins>,
  CommonSettings,
  CommonIgnores,
  ...readonly (ScopedSettings<Scopes> | ScopedRules<Scopes>)[],
];
