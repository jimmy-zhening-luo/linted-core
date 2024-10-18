import type { State } from "./state";

export type RuleRecord = Readonly<Record<
  string,
  | State
  | readonly [State, ...unknown[]]
>>;
