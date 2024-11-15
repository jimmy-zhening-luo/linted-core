import type { Scopes, Plugins } from "../scopes";
import type * as Configs from "./outputs";

export type { Configs };
export type Output = readonly [
  Configs.Common.Plugins<Plugins>,
  Configs.Common.Settings,
  Configs.Common.Ignores,
  ...readonly Configs.Scoped<Scopes>[],
];
