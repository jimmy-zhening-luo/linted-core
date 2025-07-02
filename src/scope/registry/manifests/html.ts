export const html = {
  languageOptions: {
    parser: "html" as const,
  },
  parserOptions: {
    // templateEngineSyntax: {} /* DOC: https://html-eslint.org/docs/integrating-template-engine */,
    frontmatter: true /* @default: false | DOC: https://html-eslint.org/docs/integrating-template-engine#skip-frontmatter */,
  },
  language: "@html-eslint/html",
};
