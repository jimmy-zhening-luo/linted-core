import { ScopeManifest } from "./manifest";

export default class SvelteManifest extends ScopeManifest {
  public languageOptions = {
    parser: "svelte" as const,
    globals: null,
  };
  public parserOptions = {
    parser: "ts" as const,
    extraFileExtensions: [".svelte"],
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
  };
  public processor = {
    processor: "svelte/svelte",
  };
  public language = {};
}
