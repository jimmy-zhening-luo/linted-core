import type { Config } from "../..";
import type { Only } from "./only";

export type Settings = Only<
  Config,
  (
    & {
      readonly name: `linted/*/settings`;
      readonly languageOptions: Pick<Config["languageOptions"], "ecmaVersion" | "sourceType">;
    }
    & Pick<Config, "linterOptions">
  )
>;
