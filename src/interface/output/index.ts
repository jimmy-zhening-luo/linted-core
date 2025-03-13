import type {
  CommonPlugins,
  CommonSettings,
  CommonIgnores,
} from "./common";
import type {
  ScopedSettings,
  ScopedRules,
} from "./scoped";
import type { Import, Scope } from "../../scope";

export type Output = readonly [
  CommonPlugins<Import.Plugin>,
  CommonSettings,
  CommonIgnores,
  ...readonly (ScopedSettings<Scope> | ScopedRules<Scope>)[],
];
