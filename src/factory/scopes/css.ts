import { ScopeManifest } from "./manifest";

export default class CssManifest extends ScopeManifest {
  public readonly languageOptions = {
    parser: null,
    globals: null,
    tolerant: false,
  } as const;
  public readonly parserOptions = {
    /* DOC: https://github.com/ota-meshi/yaml-eslint-parser?tab=readme-ov-file#advanced-configuration */
    parser: null,
  } as const;
  public readonly processor = {} as const;
  public readonly language = {
    language: "css/css",
  } as const;
}
