import { ScopeManifest } from "./manifest";

export default class YmlManifest extends ScopeManifest {
  public languageOptions = {
    parser: "yml" as const,
    globals: null,
  };
  public parserOptions = {
    /* DOC: https://github.com/ota-meshi/yaml-eslint-parser?tab=readme-ov-file#advanced-configuration */
    parser: null,
    defaultYAMLVersion: "1.2" /* @default: "1.2" | "1.1" */,
  };
  public processor = {};
  public language = {};
}
