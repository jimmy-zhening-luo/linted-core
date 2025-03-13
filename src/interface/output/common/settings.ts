import type { Proto } from "../../proto";

export type CommonSettings = Proto.PickConfig<
  "linted/*/",
  | "linterOptions"
  | "languageOptions"
>;
