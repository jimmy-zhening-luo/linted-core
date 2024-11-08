import type { Input } from ".";

export type Output = [
  {
    name: `linted`;
    plugins: Table<Record<"configs", unknown>>;
    linterOptions: {
      noInlineConfig: true;
      reportUnusedDisableDirectives: "error";
    };
    languageOptions: {
      sourceType?:
        | "module"
        | "script"
      ;
      ecmaVersion?:
        | "latest"
        | 3
        | 5
        | ToNumber<`20${
          | 15
          | 16
          | 17
          | 18
          | 19
          | 20
          | 21
          | 22
          | 23
          | 24
        }`>;
    };
  },
  ...(
    {
      name: `linted/${string}`;
      rules: Input["rules"]["rules"]["html"][number][1];
      files: string[];
      languageOptions: {
        sourceType?:
          | "module"
          | "script"
        ;
        ecmaVersion?:
          | "latest"
          | 3
          | 5
          | ToNumber<`20${
            | 15
            | 16
            | 17
            | 18
            | 19
            | 20
            | 21
            | 22
            | 23
            | 24
          }`>;
        globals?: Table<true>;
        parser?: unknown;
        parserOptions?: Table;
      };
      processor?: string;
      language?: string;
    }
  )[],
]
