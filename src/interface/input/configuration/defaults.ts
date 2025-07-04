import type { Config } from "../../config";

export interface Defaults<
  Scope extends string,
> {
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
