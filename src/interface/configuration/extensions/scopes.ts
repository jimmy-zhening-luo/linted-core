import type { RuleConfig } from "@eslint/config-helpers";

export type ScopeExtensions<
  Scope extends string,
  Optional extends Scope,
>
= & Record<
  Scope,
  {
    files?: string[];
    ignores?: string[];
    rules?: Record<
      string,
      Readonly<RuleConfig>
    >;
  }
>
& Record<
  Optional,
  {
    plugin: unknown;
    parser: unknown;
  }
>;
