import type { GlobalExtension } from "./global";
import type { ScopeExtensions } from "./scopes";

export type Extensions<
  Scope extends string,
  OptionalScope extends Scope,
>
= & Partial<GlobalExtension>
  & Partial<ScopeExtensions<Scope, OptionalScope>>;
