import type { RuleRecord } from "./rule";

export type * from "./rule";
export interface Config<Plugins extends string = string> {
  name: `linted/${string}`;
  plugins: Record<Plugins, { configs: unknown }>;
  files: string[];
  ignores: string[];
  rules: RuleRecord;
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
  processor?: string;
  language?: string;
  settings?: Record<string, unknown>;
}
