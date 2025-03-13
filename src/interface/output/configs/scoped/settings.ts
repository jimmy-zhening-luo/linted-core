import type { Config } from "../../../proto";

export type Settings<Scope extends string> = Config.PickConfig<
  `linted/${Scope}/`,
  | "files"
  | "ignores"
  | "processor"
  | "language"
  | "settings",
  string,
  { readonly languageOptions: object }
>;
