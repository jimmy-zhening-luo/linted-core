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
        {
          id: "enable",
          rules: {
            vanilla: ERROR,
            vanilla0: ERROR,
            vanilla1: ERROR,
            vanilla2: ERROR,
          },
        } as const,
        {
          id: "enable/stylistic",
          rules: { "@stylistic/style-rule": ERROR },
        } as const,
      ],
      ts: [
        {
          id: "disable",
          rules: { vanilla0: OFF },
        } as const,
        {
          id: "enable/extension",
          rules: {
            "@typescript-eslint/enums": ERROR,
            "@typescript-eslint/destructure-expression": ERROR,
            "@typescript-eslint/global": ERROR,
          },
        } as const,
      ],
      mocha: [
        {
          id: "disable",
          rules: { vanilla2: OFF },
        } as const,
        {
          id: "disable/ts",
          rules: { "@typescript-eslint/global": ERROR },
        } as const,
        {
          id: "enable",
          rules: { "mocha/test-expression": ERROR },
        } as const,
      ],
      svelte: [
        {
          id: "disable",
          rules: { vanilla1: OFF },
        } as const,
        {
          id: "enable-extension",
          rules: { "svelte/tags": ERROR },
        } as const,
      ],
      html: [
        {
          id: "enable",
          rules: { "html/attribute": ERROR },
        } as const,
      ],
      css: [
        {
          id: "enable",
          rules: { "css/property": ERROR },
        } as const,
      ],
      json: [
        {
          id: "enable",
          rules: {
            "jsonc/property-check": ERROR,
            "jsonc/trailing-comma": [ERROR, "always"],
          },
        } as const,
      ],
      jsonc: [
        {
          id: "override",
          rules: { "jsonc/trailing-comma": [ERROR, "never"] },
        } as const,
      ],
      yml: [
        {
          id: "enable",
          rules: { "yml/property-check": ERROR },
        } as const,
      ],
    } as const,
  } as const,
} as const;
