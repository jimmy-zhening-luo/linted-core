import { ScopeManifest } from "./manifest";

export default class CssManifest extends ScopeManifest {
  public readonly languageOptions = {
    parser: null,
    globals: null,
    tolerant: false,
  };
  public readonly parserOptions = {
    /* DOC: https://github.com/ota-meshi/yaml-eslint-parser?tab=readme-ov-file#advanced-configuration */
    parser: null,
  };
  public readonly processor = {};
  public readonly language = {
    language: "css/css",
  };
}
