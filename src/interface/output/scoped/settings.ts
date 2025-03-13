import type { PickConfig } from "../../shared";

export type ScopedSettings<Scope extends string> = PickConfig<
  `linted/${Scope}/`,
  | "files"
  | "ignores"
  | "processor"
  | "language"
  | "settings",
  string,
  { readonly languageOptions: object }
>;
