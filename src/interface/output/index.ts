import type * as Configs from "./configs";
import type { Import, Scope } from "../../scope";

export type Output = readonly [
  Configs.Global.Plugins<Import.Plugin>,
  Configs.Global.Settings,
  Configs.Global.Ignores,
  ...readonly (Configs.Scoped.Settings<Scope> | Configs.Scoped.Rules<Scope>)[],
];
