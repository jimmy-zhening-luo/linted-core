import type { Scope } from "./scopes.js";

type PluginImport = { configs: unknown };

export default interface Plugins extends Record<
  Scope,
  Record<string, { configs: unknown }>
> {
  js: { "@stylistic": PluginImport };
  ts: {
    "@stylistic": PluginImport;
    "@typescript-eslint": PluginImport;
  };
  svelte: {
    "@stylistic": PluginImport;
    "@typescript-eslint": PluginImport;
    svelte: PluginImport;
  };
  html: { "@html-eslint": PluginImport };
  json: { jsonc: PluginImport };
  jsonc: { jsonc: PluginImport };
  yml: { yml: PluginImport };
}
