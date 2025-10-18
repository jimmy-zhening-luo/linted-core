import type { ScopeManifest } from "./manifest";

export type Settings<
  Scope extends string,
  Parser extends Scope,
> = Partial<
  Record<
    Scope,
    ScopeManifest<Parser>
  >
>;
