import type { Settings } from "./settings";
import type { Rules } from "../rules";

export interface Defaults<
  Scope extends string,
  Plugin extends string,
  Parser extends Scope,
> {
  settings: Partial<Settings<
    Scope,
    Plugin,
    Parser
  >>;
  files: Partial<Record<
    Scope,
    string[]
  >>;
  ignores:
    & Record<
      "*",
      string[]
    >
    & Partial<Record<
      Scope,
      string[]
    >>;
  rules: Partial<Record<
    Scope,
    {
      id: string;
      rules: Rules;
    }[]
  >>;
}
