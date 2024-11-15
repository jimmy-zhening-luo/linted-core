import type * as Configs from "./outputs";

export type { Configs };
export type Output<
  Scopes extends string,
  Plugins extends string,
> = readonly [
  Configs.Common.Plugins<Plugins>,
  Configs.Common.Settings,
  Configs.Common.Ignores,
  ...readonly Configs.Scoped<Scopes>[],
];
