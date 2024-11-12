import type { RuleRecord } from ".";

export interface ScopedConfig {
  name: `linted/${string}`;
  rules: RuleRecord;
  files: string[];
  ignores: string[];
  languageOptions: object;
  processor?: string;
  language?: string;
}
