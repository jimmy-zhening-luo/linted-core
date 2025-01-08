import { ScopeManifest } from "./manifest";

export default class YmlManifest extends ScopeManifest<"yml"> {
  public readonly languageOptions = {
    parser: "yml",
    globals: null,
  } as const;
  public readonly parserOptions = {
    /* DOC: https://github.com/ota-meshi/yaml-eslint-parser?tab=readme-ov-file#advanced-configuration */
    parser: null,
    defaultYAMLVersion: "1.2" /* @default: "1.2" | "1.1" */,
  } as const;
  public readonly processor = {} as const;
  public readonly language = {} as const;
}
