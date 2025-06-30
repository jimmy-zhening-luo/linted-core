import type * as Configs from "./configs";

export type Output = readonly [
  Configs.Global.Plugins,
  Configs.Global.Settings,
  Configs.Global.Ignores,
  ...Array<
    | Configs.Scoped.Settings
    | Configs.Scoped.Rules
  >
];
