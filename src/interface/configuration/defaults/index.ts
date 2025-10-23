import type { RuleConfig } from "@eslint/config-helpers";

export interface Defaults<Scope extends string> {
  files: Record<Scope, string[]>;
  ignores: Partial<Record<Scope | "*", string[]>>;
  rules: Partial<Record<
    Scope,
    Array<
      {
        name: string;
        rules: {
          [rule: string]: Readonly<RuleConfig>;
        };
      }
    >
  >>;
}
