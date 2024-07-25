import type Input from "../../input/input.js";

export default interface Config {
  name: `linted/scope:${string}/rule:${string}+${string}`;
  rules: Input.Rules.Entry.Object;
  files: readonly string[];
  linterOptions: {
    noInlineConfig: true;
    reportUnusedDisableDirectives: "error";
  };
  languageOptions: {
    sourceType?:
      | "module"
      | "script";
    ecmaVersion?: "latest";
    globals?: Record<string, true>;
    parser?: unknown;
    parserOptions?: Record<string, unknown>;
  };
  plugins: Record<string, Record<"configs", unknown>>;
  processor?: string;
}