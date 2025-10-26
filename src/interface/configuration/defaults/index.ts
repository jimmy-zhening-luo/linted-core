import type { Rules } from "../../rules";

export interface Defaults<Scope extends string> {
  files: Record<Scope, string[]>;
  ignores: Partial<Record<Scope | "*", string[]>>;
  rules: Partial<Record<
    Scope,
    Array<
      {
        name: string;
        rules: Rules;
      }
    >
  >>;
}
