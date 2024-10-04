import type { Rules } from "../../input/index.js";
import type * as Config from "./option/index.js";

interface Config {
  name: `linted/scope:${string}/rule:${string}+${string}`;
  rules: Rules.RuleBase.RuleEntry.RuleObject;
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

export type { Config, Config as default };
