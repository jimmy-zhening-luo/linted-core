import type { Only } from "./only";
import type { Config } from "../config";

export type SettingsConfig = Only<
  Config,
  (
    & {
      readonly name: `linted/*/settings`;
      readonly languageOptions: Pick<Config["languageOptions"], "ecmaVersion" | "sourceType">;
    }
    & Pick<Config, "linterOptions">
  )
>;
