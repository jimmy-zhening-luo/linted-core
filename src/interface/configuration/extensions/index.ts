import type { GlobalExtension } from "./global";
import type { ScopeExtensions } from "./scopes";

export type Extensions<
  Scope extends string,
  OptionalScope extends Scope,
>
= & GlobalExtension
  & ScopeExtensions<Scope, OptionalScope>;
