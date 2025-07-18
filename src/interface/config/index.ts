import type * as Rule from "./rule";

export interface IConfig {
  name: `linted/${string}`;
  plugins: Record<string, unknown>;
  files: string[];
  ignores: string[];
  rules: Rule.Rules;
  linterOptions: {
    noInlineConfig: boolean;
    reportUnusedDisableDirectives:
      | "error"
      | "warn"
      | "off"
    ;
  };
  languageOptions: {
    sourceType:
      | "module"
      | "script"
    ;
    ecmaVersion:
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
  basePath?: string;
  processor?: string;
  language?: string;
  settings?: Record<string, unknown>;
}
