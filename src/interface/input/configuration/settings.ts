import type { Config } from "../../config";
import type { ScopeManifest } from "./manifest";

export interface Settings<
  Scope extends string,
  Parser extends string,
> {
  global: (
    & Config["linterOptions"]
    & Config["languageOptions"]
  );
  registry: Record<
    Scope,
    ScopeManifest<
      Parser
    >
  >;
}
