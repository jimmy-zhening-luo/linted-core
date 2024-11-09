import type {
  Scope,
  RuleRecord,
} from ".";

export type RulesOverrides = Partial<Record<
  Scope,
  RuleRecord
>>;
