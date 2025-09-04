const
ERROR = "error",
OFF = "off",
Plugin = "MOCK_PLUGIN",
Parser = (scope: string) => `MOCK_PARSER:${scope}`;

export const TEST_INPUT = {
  imports: {
    plugins: {
      "@stylistic": Plugin,
      "@typescript-eslint": Plugin,
      mocha: Plugin,
      "chai-friendly": Plugin,
      "chai-expect": Plugin,
      "@html-eslint": Plugin,
      css: Plugin,
      json: Plugin,
      jsonc: Plugin,
      yml: Plugin,
    },
    parsers: {
      ts: Parser("TS"),
      html: Parser("HTML"),
      yml: Parser("YML"),
    },
  },
  configuration: {
    settings: {
      global: {
        ecmaVersion: 2024,
        sourceType: "module",
        noInlineConfig: true,
        reportUnusedDisableDirectives: "error",
      } as const,
      registry: {
        js: {
          languageOptions: {},
          parserOptions: {},
        },
        ts: {
          languageOptions: {
            parser: "ts" as const,
          },
          parserOptions: {},
        },
        mocha: {
          languageOptions: {},
          parserOptions: {},
        },
        svelte: {
          languageOptions: {
            parser: "svelte" as const,
          },
          parserOptions: {
            parser: "ts" as const,
            extraFileExtensions: [".svelte"],
          },
          processor: "svelte/svelte",
        },
        html: {
          languageOptions: {
            parser: "html" as const,
          },
          parserOptions: {
            frontmatter: true,
          },
          language: "@html-eslint/html",
        },
        css: {
          languageOptions: {
            tolerant: false,
          },
          parserOptions: {},
          language: "css/css",
        },
        json: {
          languageOptions: {
            allowTrailingCommas: true,
          },
          parserOptions: {},
          language: "json/jsonc",
        },
        jsonc: {
          languageOptions: {},
          parserOptions: {},
          language: "json/jsonc",
        },
        jsoncc: {
          languageOptions: {},
          parserOptions: {},
          language: "json/jsonc",
        },
        yml: {
          languageOptions: {
            parser: "yml" as const,
          },
          parserOptions: {},
        },
      },
    },
    defaults: {
      files: {
        js: ["default.js"],
        ts: ["default.ts"],
        mocha: ["default.mocha"],
        svelte: ["default.svelte"],
        html: ["default.html"],
        css: ["default.css"],
        json: ["default.json"],
        jsonc: ["default.jsonc"],
        jsoncc: ["default-comma.jsonc"],
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
        jsoncc: ["ignore/default-comma.jsonc"],
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
            } as const,
          },
          {
            id: "enable/stylistic",
            rules: {
              "@stylistic/style-rule": ERROR,
            } as const,
          },
        ],
        ts: [
          {
            id: "disable",
            rules: {
              vanilla0: OFF,
            } as const,
          },
          {
            id: "enable/extension",
            rules: {
              "@typescript-eslint/enums": ERROR,
              "@typescript-eslint/destructure-expression": ERROR,
              "@typescript-eslint/global": ERROR,
            } as const,
          },
        ],
        mocha: [
          {
            id: "disable",
            rules: {
              vanilla2: OFF,
            } as const,
          },
          {
            id: "disable/ts",
            rules: {
              "@typescript-eslint/global": ERROR,
            } as const,
          },
          {
            id: "enable",
            rules: {
              "mocha/test-expression": ERROR,
            } as const,
          },
        ],
        svelte: [
          {
            id: "disable",
            rules: {
              vanilla1: OFF,
            } as const,
          },
          {
            id: "enable-extension",
            rules: {
              "svelte/tags": ERROR,
            } as const,
          },
        ],
        html: [
          {
            id: "enable",
            rules: {
              "html/attribute": ERROR,
            } as const,
          },
        ],
        css: [
          {
            id: "enable",
            rules: {
              "css/property": ERROR,
            } as const,
          },
        ],
        json: [
          {
            id: "enable",
            rules: {
              "jsonc/property-check": ERROR,
              "jsonc/comment": [
                ERROR,
                "never",
              ],
              "jsonc/trailing-comma": [
                ERROR,
                "never",
              ],
            } as const,
          },
        ],
        jsonc: [
          {
            id: "override-comment",
            rules: {
              "jsonc/comment": [
                ERROR,
                "allow",
              ],
            } as const,
          },
        ],
        jsoncc: [
          {
            id: "override-comma",
            rules: {
              "jsonc/trailing-comma": [
                ERROR,
                "allow",
              ],
            } as const,
          },
        ],
        yml: [
          {
            id: "enable",
            rules: {
              "yml/property-check": ERROR,
            } as const,
          },
        ],
      },
    },
    extensions: {},
    attachments: [],
  },
};
