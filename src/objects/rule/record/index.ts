import type { RuleState } from "./state";

export type { RuleState };
export type RuleRecord = Table<
  | RuleState
  | readonly [RuleState, ...unknown[]]
>;
