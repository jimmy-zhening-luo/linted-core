import type {
  Scope,
  RuleEntry,
} from ".";

export type RulesDefaults = Record<
  Scope,
  RuleEntry[]
>;
