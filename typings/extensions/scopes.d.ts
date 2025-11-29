import type { Rules } from "../rules";

export type ScopeExtensions<
  Scope extends string,
  Optional extends string,
>
= Record<
  Scope,
  {
    files?: Array<string | string[]>;
    ignores?: string[];
    rules?: Rules;
  }
>
& Record<
  Optional,
  {
    plugin: object;
    parser: object;
  }
>;
