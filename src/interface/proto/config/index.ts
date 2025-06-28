import type * as Rule from "./rule";

export type { Rule };
export type * from "./utility";
export interface Config<Plugins extends string = string> {
  name: `linted/${string}`;
  plugins: Record<Plugins, unknown>;
  files: string[];
  ignores: string[];
  rules: Rule.RuleBag;
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
