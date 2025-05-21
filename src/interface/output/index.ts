import type * as Configs from "./configs";
import type { Imports } from "../../scopes";

export type Output = readonly [
  Configs.Global.Plugins<Imports.Plugins>,
  Configs.Global.Settings,
  Configs.Global.Ignores,
  ...(Configs.Scoped.Settings | Configs.Scoped.Rules)[],
];
