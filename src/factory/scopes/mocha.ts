import { ScopeManifest } from "./manifest";

export default class MochaManifest extends ScopeManifest {
  public languageOptions = {
    parser: null,
    globals: "mocha" as const,
  };
  public parserOptions = {
    // MUST BE IDENTICAL TO TS PARSER OPTIONS (eventually see if can inherit)
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
  };
  public processor = {};
  public language = {};
}
