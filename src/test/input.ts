import type Core from "..";

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
      json: Plugin,
      jsonc: Plugin,
      yml: Plugin,
    },
    parsers: {
      ts: "parsers.ts",
      svelte: "parsers.svelte",
      html: "parsers.html",
      yml: "parsers.yml",
    },
  },
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
    },
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
    },
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
        },
        {
          id: "enable/stylistic",
          rules: {
            "@stylistic/style-rule": ERROR,
          },
        },
      ],
      ts: [
        {
          id: "disable",
          rules: {
            vanilla0: OFF,
          },
        },
        {
          id: "enable/extension",
          rules: {
            "@typescript-eslint/enums": ERROR,
            "@typescript-eslint/destructure-expression": ERROR,
            "@typescript-eslint/global": ERROR,
          },
        },
      ],
      mocha: [
        {
          id: "disable",
          rules: {
            vanilla2: OFF,
          },
        },
        {
          id: "disable/ts",
          rules: {
            "@typescript-eslint/global": ERROR,
          },
        },
        {
          id: "enable",
          rules: {
            "mocha/test-expression": ERROR,
          },
        },
      ],
      svelte: [
        {
          id: "disable",
          rules: {
            vanilla1: OFF,
          },
        },
        {
          id: "enable-extension",
          rules: {
            "svelte/tags": ERROR,
          },
        },
      ],
      html: [
        {
          id: "enable",
          rules: {
            "html/attribute": ERROR,
          },
        },
      ],
      css: [
        {
          id: "enable",
          rules: {
            "css/property": ERROR,
          },
        },
      ],
      json: [
        {
          id: "enable",
          rules: {
            "jsonc/property-check": ERROR,
            "jsonc/trailing-comma": [
              ERROR,
              "always",
            ],
          },
        },
      ],
      jsonc: [
        {
          id: "override",
          rules: {
            "jsonc/trailing-comma": [
              ERROR,
              "never",
            ],
          },
        },
      ],
      yml: [
        {
          id: "enable",
          rules: {
            "yml/property-check": ERROR,
          },
        },
      ],
    },
  },
};
