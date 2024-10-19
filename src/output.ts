import type { Input } from ".";

export type Output = (
  {
    name: `linted/${string}`;
    rules: Input["rules"]["rules"]["html"][number][1];
    files: string[];
    linterOptions: {
      noInlineConfig: true;
      reportUnusedDisableDirectives: "error";
    };
    languageOptions: {
      sourceType?:
        | "module"
        | "script";
      ecmaVersion?: "latest";
      globals?: Table<true>;
      parser?: unknown;
      parserOptions?: Record<string, unknown>; // TODO: Change to Table<unknown> after lib update
    };
    plugins: Table<Record<"configs", unknown>>;
    processor?: string;
  }
)[];
