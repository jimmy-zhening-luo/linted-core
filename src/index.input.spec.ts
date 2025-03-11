import type Core from ".";

const
ERROR = "error",
OFF = "off",
Plugin = "TEST_PLUGIN";

export const TestInput: Parameters<typeof Core>[0] = {
  imports: {
    plugins: {
      "@stylistic": Plugin,
      "@typescript-eslint": Plugin,
      mocha: Plugin,
      "chai-friendly": Plugin,
      "chai-expect": Plugin,
      svelte: Plugin,
      "@html-eslint": Plugin,
      css: Plugin,
      jsonc: Plugin,
      yml: Plugin,
    } as const,
    parsers: {
      ts: "parsers.ts",
      svelte: "parsers.svelte",
      html: "parsers.html",
      jsonc: "parsers.jsonc",
      yml: "parsers.yml",
    } as const,
  } as const,
  extensions: {},
  defaults: {
    settings: {
      ecmaVersion: 2024,
      sourceType: "module",
      noInlineConfig: true,
      reportUnusedDisableDirectives: "error",
    },
    files: {
      js: ["default.js"],
      ts: ["default.ts"],
      mocha: ["default.mocha"],
      svelte: ["default.svelte"],
      html: ["default.html"],
      css: ["default.css"],
      json: ["default.json"],
      jsonc: ["default.jsonc"],
      yml: ["default.yml"],
    } as const,
    ignores: {
      "*": ["ignore/default.*"],
      js: ["ignore/default.js"],
      ts: ["ignore/default.ts"],
      mocha: ["ignore/default.mocha"],
      svelte: ["ignore/default.svelte"],
      html: ["ignore/default.html"],
      css: ["ignore/default.css"],
      json: ["ignore/default.json"],
      jsonc: ["ignore/default.jsonc"],
      yml: ["ignore/default.yml"],
    } as const,
    rules: {
      js: [
        [
          "enable",
          {
            vanilla: ERROR,
            vanilla0: ERROR,
            vanilla1: ERROR,
            vanilla2: ERROR,
          },
        ] as const,
        ["enable/stylistic", { "@stylistic/style-rule": ERROR }] as const,
      ],
      ts: [
        ["disable", { vanilla0: OFF }] as const,
        ["enable", { "@typescript-eslint/vanilla-typed": ERROR }] as const,
        [
          "enable/extension",
          {
            "@typescript-eslint/enums": ERROR,
            "@typescript-eslint/destructure-expression": ERROR,
            "@typescript-eslint/global": ERROR,
          },
        ] as const,
      ],
      mocha: [
        ["disable", { vanilla2: OFF }] as const,
        ["disable/ts", { "@typescript-eslint/global": ERROR }] as const,
        ["enable", { "mocha/test-expression": ERROR }] as const,
      ],
      svelte: [
        ["disable", { vanilla1: OFF }] as const,
        ["disable/ts", { "@typescript-eslint/destructure-expression": ERROR }] as const,
        ["enable", { "svelte/destructure-expression": ERROR }] as const,
        ["enable-extension", { "svelte/tags": ERROR }] as const,
      ],
      html: [["enable", { "html/attribute": ERROR }] as const],
      css: [["enable", { "css/property": ERROR }] as const],
      json: [
        [
          "enable",
          {
            "jsonc/property-check": ERROR,
            "jsonc/trailing-comma": [ERROR, "always"],
          },
        ] as const,
      ],
      jsonc: [["override", { "jsonc/trailing-comma": [ERROR, "never"] }] as const],
      yml: [["enable", { "yml/property-check": ERROR }] as const],
    } as const,
  } as const,
} as const;
