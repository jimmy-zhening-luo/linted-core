import { ScopeManifest } from "./manifest";

export default class YmlManifest extends ScopeManifest {
  public readonly languageOptions = {
    parser: "yml",
    globals: null,
  } as const;
  public readonly parserOptions = {
    /* DOC: https://github.com/ota-meshi/yaml-eslint-parser?tab=readme-ov-file#advanced-configuration */
    parser: null,
    defaultYAMLVersion: "1.2" /* @default: "1.2" | "1.1" */,
  };
  public readonly processor = {};
  public readonly language = {};
}
