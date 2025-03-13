import type { Proto } from "../../proto";

export type ScopedSettings<Scope extends string> = Proto.PickConfig<
  `linted/${Scope}/`,
  | "files"
  | "ignores"
  | "processor"
  | "language"
  | "settings",
  string,
  { readonly languageOptions: object }
>;
