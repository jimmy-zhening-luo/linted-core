import type { IConfig } from "../../../config";

export type ScopeExtensions<
  Scope extends string,
  OptionalScope extends Scope,
>
= & Record<
  Scope,
  {
    files?: string[];
    ignores?: string[];
    rules?: IConfig["rules"];
  }
>
& Record<
  OptionalScope,
  {
    plugin: unknown;
    parser: unknown;
  }
>;
