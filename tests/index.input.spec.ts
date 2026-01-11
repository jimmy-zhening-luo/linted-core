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
  ],
  [
    "jsonc",
    ["json"],
  ],
  [
    "svelte",
    ["ts"],
  ],
  [
    "ts",
    ["js"],
  ],
] as const,
imports = {
  plugins: {
    "@typescript-eslint": Plugin,
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
    "*": [
      {
        rules: {
          global0: State.WARN,
          global1: State.ERROR,
        },
      },
    ],
    js: [
      {
        rules: {
          vanilla: State.ERROR,
          vanilla0: State.ERROR,
          vanilla1: State.ERROR,
          vanilla2: State.ERROR,
        },
      },
    ],
    ts: [
      {
        rules: {
          vanilla0: State.OFF,
        },
      },
      {
        rules: {
          "@typescript-eslint/enums": State.ERROR,
          "@typescript-eslint/destructure-expression": State.ERROR,
          "@typescript-eslint/global": State.ERROR,
        },
      },
    ],
    svelte: [
      {
        rules: {
          vanilla1: State.OFF,
        },
      },
      {
        rules: {
          "svelte/tags": State.ERROR,
        },
      },
    ],
    html: [
      {
        rules: {
          "html/attribute": State.ERROR,
        },
      },
    ],
    json: [
      {
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
