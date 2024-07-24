export default interface IConfig {
  name: `scope:${string}/rule:${string}+${string}`;
  rules: IRule;
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
