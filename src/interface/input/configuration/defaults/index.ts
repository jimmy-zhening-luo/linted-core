import type { Settings } from "./settings";
import type { IConfig } from "../../../config";

export interface Defaults<
  Scope extends string,
  Parser extends Scope,
> {
  settings: Settings<
    Scope,
    Parser
  >;
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
      rules: IConfig["rules"];
    }[]
  >;
}
