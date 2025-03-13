import type { Config } from "../../../proto";

export type Settings = Config.PickConfig<
  "linted/*/",
  | "linterOptions"
  | "languageOptions"
>;
