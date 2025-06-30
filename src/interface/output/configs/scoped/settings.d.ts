import type { Config } from "../../../config";

export type Rules = {
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
