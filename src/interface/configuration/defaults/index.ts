import type { RuleConfig } from "@eslint/config-helpers";

export interface Defaults<Scope extends string> {
  files: Record<
    Scope,
    string[]
  >;
  ignores:
    & Record<
      "*",
      string[]
    >
    & Partial<
      Record<
        Scope,
        string[]
      >
    >;
  rules: Partial<
    Record<
      Scope,
      Array<
        {
          name: string;
          rules: Record<
            string,
            Readonly<RuleConfig>
          >;
        }
      >
    >
  >;
}
