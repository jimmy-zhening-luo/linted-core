import type { RuleState } from "./state";

export type RuleRecord = Table<RuleState | readonly [RuleState, ...unknown[]]>;
