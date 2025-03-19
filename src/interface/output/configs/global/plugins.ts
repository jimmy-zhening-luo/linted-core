import type { Config } from "../../../proto";

export type Plugins<Plugins extends string> = Config.PickConfig<
  "linted/*/plugins/",
  "plugins",
  Plugins
>;
