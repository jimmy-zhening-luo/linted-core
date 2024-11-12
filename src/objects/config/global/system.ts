import type {
  Plugins,
  ConfigProperty,
} from "..";

export type GlobalConfigSystem = Partial<Record<
  Exclude<
    ConfigProperty,
    | "name"
    | "plugins"
    | "linterOptions"
    | "languageOptions"
  >,
  never
>> & {
  name: "linted/global/settings";
  plugins: Plugins;
  linterOptions: {
    noInlineConfig: boolean;
    reportUnusedDisableDirectives:
      | "error"
      | "warn"
      | "off"
    ;
  };
  languageOptions: {
    sourceType?:
      | "module"
      | "script"
    ;
    ecmaVersion?:
      | "latest"
      | 3
      | 5
      | 2015
      | 2016
      | 2017
      | 2018
      | 2019
      | 2020
      | 2021
      | 2022
      | 2023
      | 2024
    ;
  };
};
