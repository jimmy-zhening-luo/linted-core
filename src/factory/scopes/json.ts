import { ScopeManifest } from "./manifest";

export default class JsonManifest extends ScopeManifest {
  public readonly languageOptions = {
    parser: null,
    globals: null,
  };
  public readonly parserOptions = { parser: null };
  public readonly processor = {};
  public readonly language = {
    language: "json/json",
  };
}
