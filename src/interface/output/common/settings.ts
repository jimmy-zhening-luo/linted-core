import type { PartialConfig } from "../../shared";

export type CommonSettings = PartialConfig<
  "linted/*/",
  | "linterOptions"
  | "languageOptions"
>;
