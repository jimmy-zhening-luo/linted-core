import { ScopeManifest } from "./manifest";

export default class HtmlManifest extends ScopeManifest {
  public languageOptions = {
    parser: "html" as const,
    globals: null,
  };
  public parserOptions = {
    parser: null,
    frontmatter: true /* DOC: https://github.com/yeonjuan/html-eslint/issues/291#issuecomment-2726307803 */,
  };
  public processor = {};
  public language = {
    language: "@html-eslint/html",
  };
}
