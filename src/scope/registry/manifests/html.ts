export const html = {
  languageOptions: {
    parser: "html" as const,
  },
  parserOptions: {
    frontmatter: true /* DOC: https://github.com/yeonjuan/html-eslint/issues/291#issuecomment-2726307803 */,
  },
  language: "@html-eslint/html",
};
