import type { Config } from "../../../proto";

export type Ignores = Config.PickConfig<
  "linted/*/ignores/",
  "ignores"
>;
