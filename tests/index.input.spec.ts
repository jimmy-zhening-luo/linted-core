const enum State {
  OFF = 0,
  WARN = 1,
  ERROR = 2,
}
const Plugin = "MOCK_PLUGIN",
Parser = (scope: string) => `MOCK_PARSER:${scope}`;

export const scopes = [
  "js",
  "ts",
  "mocha",
  "svelte",
  "html",
  "json",
  "jsonc",
  "jsoncc",
] as const,
optional = ["svelte"] as const,
tree = [
  [
    "jsoncc",
    ["jsonc"],
  ] as const,
  [
    "jsonc",
    ["json"],
  ] as const,
  [
    "mocha",
    ["ts"],
  ] as const,
  [
    "svelte",
    ["ts"],
  ] as const,
  [
    "ts",
    ["js"],
  ] as const,
],
imports = {
  plugins: {
    "@stylistic": Plugin,
    "@typescript-eslint": Plugin,
    mocha: Plugin,
    "chai-friendly": Plugin,
    "chai-expect": Plugin,
    html: Plugin,
    json: Plugin,
    jsonc: Plugin,
  },
  parsers: {
    ts: Parser("TS"),
    html: Parser("HTML"),
  },
},
settings = {
  ts: {
    languageOptions: {
      parser: "ts" as const,
    },
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
    language: "html/html",
  },
  json: {
    languageOptions: {
      allowTrailingCommas: true,
    },
    language: "json/jsonc",
  },
},
defaults = {
  files: {
    js: ["default.js"],
    ts: ["default.ts"],
    mocha: ["default.mocha"],
    svelte: ["default.svelte"],
    html: ["default.html"],
    json: ["default.json"],
    jsonc: ["default.jsonc"],
    jsoncc: ["default-comma.jsonc"],
  },
  ignores: {
    "*": ["ignore/default.*"],
    js: ["ignore/default.js"],
    json: ["ignore/default.json"],
    jsoncc: ["ignore/default-comma.jsonc"],
  },
  rules: {
    js: [
      {
        name: "enable",
        rules: {
          vanilla: State.ERROR,
          vanilla0: State.ERROR,
          vanilla1: State.ERROR,
          vanilla2: State.ERROR,
        },
      },
      {
        name: "enable/stylistic",
        rules: {
          "@stylistic/style-rule": State.ERROR,
        },
      },
    ],
    ts: [
      {
        name: "disable",
        rules: {
          vanilla0: State.OFF,
        },
      },
      {
        name: "enable/extension",
        rules: {
          "@typescript-eslint/enums": State.ERROR,
          "@typescript-eslint/destructure-expression": State.ERROR,
          "@typescript-eslint/global": State.ERROR,
        },
      },
    ],
    mocha: [
      {
        name: "disable",
        rules: {
          vanilla2: State.OFF,
        },
      },
      {
        name: "disable/ts",
        rules: {
          "@typescript-eslint/global": State.ERROR,
        },
      },
      {
        name: "enable",
        rules: {
          "mocha/test-expression": State.ERROR,
        },
      },
    ],
    svelte: [
      {
        name: "disable",
        rules: {
          vanilla1: State.OFF,
        },
      },
      {
        name: "enable-extension",
        rules: {
          "svelte/tags": State.ERROR,
        },
      },
    ],
    html: [
      {
        name: "enable",
        rules: {
          "html/attribute": State.ERROR,
        },
      },
    ],
    json: [
      {
        name: "enable",
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
        name: "override-comment",
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
        name: "override-comma",
        rules: {
          "jsonc/trailing-comma": [
            State.ERROR,
            "allow",
          ] as const,
        },
      },
    ],
  },
},
extensions = {};
