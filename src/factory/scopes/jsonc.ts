import { ScopeManifest } from "./manifest";

export default class JsoncManifest extends ScopeManifest {
  public languageOptions = {
    parser: null,
    globals: null,
    allowTrailingCommas: true,
  };
  public parserOptions = {
    parser: null,
  };
  public processor = {};
  public language = {
    language: "json/jsonc",
  };
}
