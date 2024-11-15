import type { PartialConfig } from "../../shared";

export type Settings = PartialConfig<
  { readonly name: `linted/*/settings` },
  | "linterOptions"
  | "languageOptions"
>;
