const enum State {
  OFF = 0,
  WARN = 1,
  ERROR = 2,
}
const Plugin = "MOCK_PLUGIN",
Parser = (scope: string) => `MOCK_PARSER:${scope}`;

export const MOCK_INPUT = {
  imports: {
    plugins: {
      "@stylistic": Plugin,
      "@typescript-eslint": Plugin,
      mocha: Plugin,
      "chai-friendly": Plugin,
      "chai-expect": Plugin,
      html: Plugin,
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
    defaults: {
      settings: {
        js: {},
        ts: {
          languageOptions: {
            parser: "ts" as const,
          },
        },
        mocha: {},
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
          language: "html/html",
        },
        css: {
          languageOptions: {
            tolerant: false,
          },
          language: "css/css",
        },
        json: {
          languageOptions: {
            allowTrailingCommas: true,
          },
          language: "json/jsonc",
        },
        jsonc: {
          language: "json/jsonc",
        },
        jsoncc: {
          language: "json/jsonc",
        },
        yml: {
          languageOptions: {
            parser: "yml" as const,
          },
        },
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
              vanilla: State.ERROR,
              vanilla0: State.ERROR,
              vanilla1: State.ERROR,
              vanilla2: State.ERROR,
            },
          },
          {
            id: "enable/stylistic",
            rules: {
              "@stylistic/style-rule": State.ERROR,
            },
          },
        ],
        ts: [
          {
            id: "disable",
            rules: {
              vanilla0: State.OFF,
            },
          },
          {
            id: "enable/extension",
            rules: {
              "@typescript-eslint/enums": State.ERROR,
              "@typescript-eslint/destructure-expression": State.ERROR,
              "@typescript-eslint/global": State.ERROR,
            },
          },
        ],
        mocha: [
          {
            id: "disable",
            rules: {
              vanilla2: State.OFF,
            },
          },
          {
            id: "disable/ts",
            rules: {
              "@typescript-eslint/global": State.ERROR,
            },
          },
          {
            id: "enable",
            rules: {
              "mocha/test-expression": State.ERROR,
            },
          },
        ],
        svelte: [
          {
            id: "disable",
            rules: {
              vanilla1: State.OFF,
            },
          },
          {
            id: "enable-extension",
            rules: {
              "svelte/tags": State.ERROR,
            },
          },
        ],
        html: [
          {
            id: "enable",
            rules: {
              "html/attribute": State.ERROR,
            },
          },
        ],
        css: [
          {
            id: "enable",
            rules: {
              "css/property": State.ERROR,
            },
          },
        ],
        json: [
          {
            id: "enable",
            rules: {
              "jsonc/property-check": State.ERROR,
              "jsonc/comment": [
                State.ERROR,
                "never",
              ] as const,
              "jsonc/trailing-comma": [
                State.ERROR,
                "never",
              ] as const,
            },
          },
        ],
        jsonc: [
          {
            id: "override-comment",
            rules: {
              "jsonc/comment": [
                State.ERROR,
                "allow",
              ] as const,
            },
          },
        ],
        jsoncc: [
          {
            id: "override-comma",
            rules: {
              "jsonc/trailing-comma": [
                State.ERROR,
                "allow",
              ] as const,
            },
          },
        ],
        yml: [
          {
            id: "enable",
            rules: {
              "yml/property-check": State.ERROR,
            },
          },
        ],
      },
    },
    extensions: {},
  },
};
