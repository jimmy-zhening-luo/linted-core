import type { Rules } from "../../rules";

export type ScopeExtensions<
  Scope extends string,
  OptionalScope extends Scope,
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
  OptionalScope,
  {
    plugin: unknown;
    parser: unknown;
  }
>;
