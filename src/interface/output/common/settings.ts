import type { PartialConfig } from "../../shared";

export type CommonSettings = PartialConfig<
  { readonly name: `linted/*/` },
  | "linterOptions"
  | "languageOptions"
>;
