import type { Globals, ScopeConfig } from "./configs";

export type * from "./configs";
export type Output = readonly [
  Globals.PluginsConfig,
  Globals.SettingsConfig,
  Globals.IgnoresConfig,
  ...readonly ScopeConfig[],
];
