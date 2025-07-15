import type { IConfig } from "../../../config";

export type ScopeSettings = {
  name: `linted/${string}`;
  languageOptions?: object;
} & Pick<
  IConfig,
  (
    | "files"
    | "ignores"
    | "processor"
    | "language"
    | "settings"
  )
>;
