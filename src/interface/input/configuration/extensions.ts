import type { IConfig } from "../../config";

export type Extensions<
  Scope extends string,
  OptionalScope extends Scope,
>
= & {
  "*"?: Partial<
    & IConfig["linterOptions"]
    & IConfig["languageOptions"]
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
      rules?: IConfig["rules"];
    }
  >
>
& Partial<
  Record<
    OptionalScope,
    {
      plugin: unknown;
      parser: unknown;
    }
  >
>;
