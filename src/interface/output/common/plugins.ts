import type { PickConfig } from "../../shared";

export type CommonPlugins<Plugins extends string> = PickConfig<
  "plugins",
  "plugins",
  Plugins
>;
