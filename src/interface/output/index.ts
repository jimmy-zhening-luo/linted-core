import type * as Configs from "./configs";
import type { Imports, Scope } from "../../scopes";

export type Output = readonly [
  Configs.Global.Plugins<Imports.Plugin>,
  Configs.Global.Settings,
  Configs.Global.Ignores,
  ...readonly (Configs.Scoped.Settings<Scope> | Configs.Scoped.Rules<Scope>)[],
];
