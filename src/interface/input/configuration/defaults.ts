import type { Config } from "../../config";

export interface Defaults<
  Scope extends string,
> {
  settings: (
    & Config["linterOptions"]
    & Config["languageOptions"]
  );
  files: Record<
    Scope,
    string[]
  >;
  ignores: Record<
    (
      | "*"
      | Scope
    ),
    string[]
  >;
  rules: Record<
    Scope,
    {
      id: string;
      rules: Config["rules"];
    }[]
  >;
}
