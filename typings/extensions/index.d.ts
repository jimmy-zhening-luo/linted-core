import type { GlobalExtension } from "./global";
import type { ScopeExtensions } from "./scopes";

export type Extensions<
  Scope extends string,
  Optional extends string,
>
= Partial<GlobalExtension>
  & Partial<ScopeExtensions<Scope, Optional>>;
