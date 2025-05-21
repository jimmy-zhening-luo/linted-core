import { ScopeManifest } from "./manifest";

export default class JsManifest extends ScopeManifest {
  public languageOptions = {
    parser: null,
    globals: null,
  };
  public parserOptions = {
    parser: null,
  };
  public processor = {};
  public language = {};
}
