import type { ScopeManifest } from "./manifest";

export type Settings<
  Scope extends string,
  Parser extends Scope,
> = Record<
  Scope,
  ScopeManifest<
    Parser
  >
>;
