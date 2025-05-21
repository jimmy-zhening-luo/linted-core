import { ScopeManifest } from "./manifest";

export default class CssManifest extends ScopeManifest {
  public languageOptions = {
    parser: null,
    globals: null,
    tolerant: false,
  };
  public parserOptions = {
    /* DOC: https://github.com/ota-meshi/yaml-eslint-parser?tab=readme-ov-file#advanced-configuration */
    parser: null,
  };
  public processor = {};
  public language = {
    language: "css/css",
  };
}
