import type { IConfig } from "../../../config";

export type Settings = {
  name: "linted/*/settings/";
} & Pick<
  IConfig,
  (
    | "linterOptions"
    | "languageOptions"
  )
>;
