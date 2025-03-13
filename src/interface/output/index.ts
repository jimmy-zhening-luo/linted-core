import type {
  CommonPlugins,
  CommonSettings,
  CommonIgnores,
} from "./common";
import type {
  ScopedSettings,
  ScopedRules,
} from "./scoped";
import type { Import, Scopes } from "../../scopes";

export type Output = readonly [
  CommonPlugins<Import.Plugins>,
  CommonSettings,
  CommonIgnores,
  ...readonly (ScopedSettings<Scopes> | ScopedRules<Scopes>)[],
];
