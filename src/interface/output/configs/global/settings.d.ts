import type { Config } from "../../../config";

export type Settings = {
  name: "linted/*/settings/";
} & Pick<
  Config,
  | "linterOptions"
  | "languageOptions"
>;
