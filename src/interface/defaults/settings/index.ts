import type { ScopeManifest } from "./manifest";

export type Settings<
  Scope extends string,
  Plugin extends string,
  Parser extends Scope,
> = Record<
  Scope,
  ScopeManifest<
    Plugin,
    Parser
  >
>;
