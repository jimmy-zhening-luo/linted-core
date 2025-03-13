import type { Proto } from "../../proto";

export type CommonPlugins<Plugins extends string> = Proto.PickConfig<
  "plugins",
  "plugins",
  Plugins
>;
