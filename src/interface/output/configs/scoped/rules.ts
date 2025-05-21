import type { Config } from "../../../proto";

export type Rules = Config.PickConfig<
  `linted/${string}`,
  | "files"
  | "ignores"
  | "rules"
>;
