import type { GlobalExtension } from "./global";
import type { ScopeExtensions } from "./scopes";

export type Extensions<
  Scope extends string,
  Optional extends Scope,
>
= Partial<
  & GlobalExtension
  & ScopeExtensions<Scope, Optional>
>;
