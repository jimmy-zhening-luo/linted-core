import { ScopeManifest } from "./manifest";

export default class HtmlManifest extends ScopeManifest<"html"> {
  public readonly languageOptions = {
    parser: "html",
    globals: null,
  } as const;
  public readonly parserOptions = {
    parser: null,
    frontmatter: true /* DOC: https://github.com/yeonjuan/html-eslint/issues/291#issuecomment-2726307803 */,
  } as const;
  public readonly processor = {} as const;
  public readonly language = {
    language: "html/html",
  } as const;
}
