import type { Scope } from "./scopes.js";

type PluginPackage = { configs: unknown };

export default interface Plugins extends Record<
  Scope,
  Record<
    string,
    { configs: unknown }
  >
> {
  js: { "@stylistic": PluginPackage };
  ts: {
    "@stylistic": PluginPackage;
    "@typescript-eslint": PluginPackage;
  };
  svelte: {
    "@stylistic": PluginPackage;
    "@typescript-eslint": PluginPackage;
    svelte: PluginPackage;
  };
  html: { "@html-eslint": PluginPackage };
  json: { jsonc: PluginPackage };
  jsonc: { jsonc: PluginPackage };
  yml: { yml: PluginPackage };
}
