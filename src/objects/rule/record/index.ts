import type { RuleState } from "./state";

export type { RuleState };
export type RuleRecord = Record<
  string,
  | RuleState
  | readonly [RuleState, ...unknown[]]
>;
