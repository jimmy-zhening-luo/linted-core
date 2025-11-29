import type { Rules } from "../rules";

export type ScopeExtensions<
  Scope extends string,
  Optional extends string,
>
= Record<
  Scope,
  {
    readonly files?: readonly(string | readonly string[])[];
    readonly ignores?: readonly string[];
    readonly rules?: Rules;
  }
>
& Record<
  Optional,
  {
    readonly plugin: object;
    readonly parser: object;
  }
>;
