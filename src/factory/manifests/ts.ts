import type { IManifest } from "./manifest";

export const ts: IManifest = {
  languageOptions: {
    parser: "ts" as const,
    globals: null,
  },
  parserOptions: {
    // DOC: https://typescript-eslint.io/packages/parser/#configuration
    // DOC:(USE-CASE): https://typescript-eslint.io/getting-started/typed-linting/
    parser: null,
    ecmaFeatures: {
      jsx: false,
      globalReturn: true,
    },
    jsDocParsingMode: "none" /* @default(project): "all" | @default: "none" | "type-info" */,
    projectService: true /* DOC: https://typescript-eslint.io/packages/parser/#projectservice , DOC: https://typescript-eslint.io/troubleshooting/typed-linting/#project-service-issues */,
    // tsconfigRootDir: import.meta.dirname /* DOC: https://typescript-eslint.io/packages/parser/#tsconfigrootdir ; see `DOC:(USE-CASE), I am inferring that an aboslute path is needed ; DOC:(Node.js: import.meta): https://nodejs.org/api/esm.html#importmetadirname */,
    warnOnUnsupportedTypeScriptVersion: false,
    sourceType: "module",
    ecmaVersion: 2023,
  },
};
