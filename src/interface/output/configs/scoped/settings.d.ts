import type { Config } from "../../../config";

export type Settings = {
  name: `linted/${string}`;
  languageOptions: object;
} & Pick<
  Config,
  | "files"
  | "ignores"
  | "processor"
  | "language"
  | "settings"
>;
