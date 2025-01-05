import type { PartialConfig } from "../../shared";

export type ScopedSettings<Scope extends string> = PartialConfig<
  `linted/${Scope}/`,
  | "files"
  | "ignores"
  | "processor"
  | "language"
  | "settings",
  string,
  { readonly languageOptions: object }
>;
