import type { IManifest } from "./manifest";

export const css: IManifest = {
  languageOptions: {
    parser: null,
    globals: null,
    tolerant: false,
  },
  parserOptions: {
    /* DOC: https://github.com/ota-meshi/yaml-eslint-parser?tab=readme-ov-file#advanced-configuration */
    parser: null,
  },
  language: "css/css",
};
