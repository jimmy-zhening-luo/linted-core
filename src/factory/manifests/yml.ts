import type { IManifest } from "./manifest";

export const yml: IManifest = {
  languageOptions: {
    parser: "yml" as const,
    globals: null,
  },
  parserOptions: {
    /* DOC: https://github.com/ota-meshi/yaml-eslint-parser?tab=readme-ov-file#advanced-configuration */
    parser: null,
    defaultYAMLVersion: "1.2" /* @default: "1.2" | "1.1" */,
  },
}
