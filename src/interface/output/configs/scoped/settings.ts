import type { Config } from "../../../proto";

export type Settings = Config.PickConfig<
  `linted/${string}`,
  | "files"
  | "ignores"
  | "processor"
  | "language"
  | "settings",
  string,
  {
    languageOptions: object;
  }
>;
