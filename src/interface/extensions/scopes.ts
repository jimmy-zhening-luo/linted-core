import type { Rules } from "../rules";

export type ScopeExtensions<
  Scope extends string,
  Optional extends Scope,
>
= & Record<
  Scope,
  {
    files?: string[];
    ignores?: string[];
    rules?: Rules;
  }
>
& Record<
  Optional,
  {
    plugin: unknown;
    parser: unknown;
  }
>;
