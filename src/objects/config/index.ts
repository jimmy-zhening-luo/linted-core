import type { RuleRecord } from "..";

export interface Config {
  name: `linted/${string}`;
  rules: RuleRecord;
  files: string[];
  ignores: string[];
  languageOptions: {
    parser?: unknown;
    parserOptions?: Table;
    globals?: Table<true>;
  };
  processor?: string;
  language?: string;
}
export type { ConfigProperty } from "./property";
