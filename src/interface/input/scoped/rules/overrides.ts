import type { RuleRecord } from ".";
import type { RulesDefaults } from "./defaults";

export type RulesOverrides = Partially<
  keyof RulesDefaults,
  RuleRecord
>;
