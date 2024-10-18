import type { Input } from "./input";

interface Config {
  name: `linted/scope:${string}/rule:${string}+${string}`;
  rules: Input["rules"]["rules"]["html"][number][1];
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

export type Output = Config[];
