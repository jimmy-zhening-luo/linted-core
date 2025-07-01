import type { IManifest } from "./manifest";

export const html: IManifest = {
  languageOptions: {
    parser: "html" as const,
    globals: null,
  },
  parserOptions: {
    parser: null,
    frontmatter: true /* DOC: https://github.com/yeonjuan/html-eslint/issues/291#issuecomment-2726307803 */,
  },
  language: "@html-eslint/html",
};
