import type { Config } from "../../../proto";

export type Plugins<Plugins extends string> = Config.PickConfig<
  "plugins",
  "plugins",
  Plugins
>;
