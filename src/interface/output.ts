import type * as Configs from "./configs";

export type { Configs };
export type Output = readonly [
  Configs.Globals.Plugins,
  Configs.Globals.Settings,
  Configs.Globals.Ignores,
  ...readonly Configs.Scoped[],
];
