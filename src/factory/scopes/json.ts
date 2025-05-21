import { ScopeManifest } from "./manifest";

export default class JsonManifest extends ScopeManifest {
  public languageOptions = {
    parser: null,
    globals: null,
  };
  public parserOptions = {
    parser: null,
  };
  public processor = {};
  public language = {
    language: "json/json",
  };
}
