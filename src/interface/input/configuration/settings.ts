import type { IConfig } from "../../config";
import type { ScopeManifest } from "./manifest";

export interface Settings<
  Scope extends string,
  Parser extends string,
> {
  global:
    & IConfig["linterOptions"]
    & IConfig["languageOptions"]
  ;
  registry: Record<
    Scope,
    ScopeManifest<
      Parser
    >
  >;
}
