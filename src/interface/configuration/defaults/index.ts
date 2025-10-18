import type { Rules } from "../../rules";

export interface Defaults<Scope extends string> {
  files: Partial<
    Record<
      Scope,
      string[]
    >
  >;
  ignores:
    & Record<
      "*",
      string[]
    >
    & Partial<
      Record<
        Scope,
        string[]
      >
    >;
  rules: Partial<
    Record<
      Scope,
      {
        id: string;
        rules: Rules;
      }[]
    >
  >;
}
