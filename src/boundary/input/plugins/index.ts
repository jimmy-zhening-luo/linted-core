import type { Scope } from "../input.js";

type PluginImport = { configs: unknown };

export default interface Plugins extends Record<Scope, Record<string, PluginImport>> {
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
