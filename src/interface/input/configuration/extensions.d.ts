import type { Config } from "../../config";

export type Extensions<
  Scope extends string,
> = (
  & {
    "*"?: Partial<
      & Config["linterOptions"]
      & Config["languageOptions"]
    > & {
      ignores?: string[];
      override?: boolean;
    };
  }
  & Partial<
    Record<
      Scope,
      {
        files?: string[];
        ignores?: string[];
        rules?: Config[rules];
      }
    >
  >
);
