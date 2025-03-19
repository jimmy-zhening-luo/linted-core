import type { Config } from "../../../proto";

export type Settings = Config.PickConfig<
  "linted/*/settings/",
  | "linterOptions"
  | "languageOptions"
>;
