import type { PickConfig } from "../../shared";

export type CommonSettings = PickConfig<
  "linted/*/",
  | "linterOptions"
  | "languageOptions"
>;
