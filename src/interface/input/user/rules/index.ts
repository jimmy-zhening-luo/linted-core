export type {
  Scope,
  RuleEntry,
  RuleRecord,
} from "..";

import type { RulesDefaults } from "./defaults";
import type { RulesOverrides } from "./overrides";

export interface InputRules {
  rules: RulesDefaults;
  overrides: RulesOverrides;
}
